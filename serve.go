package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/oskanberg/go-etsy"
)

const UPDATE_INTERVAL_MINUTES = 10

var lastUpdate time.Time

var listings etsy.Listings

var etsyCli *etsy.Etsy

func updateRecord() {
	var err error

	lastUpdate = time.Now()
	// dev test: Lochbroompottery
	listings, err = etsyCli.GetStoreListings("thegraffhampotter", 1000)
	if err != nil {
		return
	}

	fmt.Println()
}

func listingsHandler(w http.ResponseWriter, r *http.Request) {
	log.Printf("API  :: %s %s", r.Method, r.URL)

	if time.Since(lastUpdate).Minutes() > UPDATE_INTERVAL_MINUTES {
		// update
		updateRecord()
	}

	var start, end int
	var err error

	start, err = strconv.Atoi(r.FormValue("start"))
	if err != nil {
		start = 0
	}

	end, err = strconv.Atoi(r.FormValue("end"))
	if err != nil {
		end = listings.Count
	}

	if start < 0 {
		start = 0
	}

	if end < start {
		return
	}

	if start > listings.Count {
		start = listings.Count
	}

	if end > listings.Count {
		end = listings.Count
	}

	response, err := json.Marshal(listings.Results[start:end])
	if err != nil {
		log.Fatal(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Write(response)
}

func invalidateCacheHandler(w http.ResponseWriter, r *http.Request) {
	var err error
	log.Printf("API  :: %s %s", r.Method, r.URL)

	lastUpdate, err = time.Parse(time.RFC3339, "1970-01-01T00:00:00+00:00")

	if err != nil {
		log.Fatal(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func main() {
	var err error

	etsyCli = etsy.New("gpxfh80ncxzfq470e0w38if8")
	lastUpdate, err = time.Parse(time.RFC3339, "1970-01-01T00:00:00+00:00")

	if err != nil {
		log.Fatal(err)
		return
	}

	fs := http.FileServer(http.Dir("public"))
	http.Handle("/", fs)

	http.HandleFunc("/api/v1/listings", listingsHandler)
	http.HandleFunc("/api/v1/invalidateCache", invalidateCacheHandler)
	http.ListenAndServe(":1124", nil)
}
