import {
  CACHE_PODCAST,
  SET_FEED_URL,
  SET_TOP_PODCASTS,
  SET_PODCAST,
  SET_URL,
  SET_CURRENT_EPISODE,
  ADD_PODCAST,
  NORMALIZE_PODCAST_DATA,
  SET_ACTIVE_PODCAST,
  SET_SEARCH,
  SET_SEARCH_RESULTS,
  SET_CURRENT_VIEW,
  SET_URL_DATA
} from "../constants/ActionTypes";
import { Route } from "../constants/routes";

export function setPodcast(feed) {
  return {
    type: SET_PODCAST,
    feed
  };
}
export function cachePodcast(feedUrl, feed) {
  return {
    type: CACHE_PODCAST,
    feedUrl,
    feed
  };
}
export function addPodcast(podcastName, feedUrl) {
  return {
    type: ADD_PODCAST,
    podcastName,
    feedUrl
  };
}

export function subscribe() {
  return (dispatch, getState) => {
    const app = getState().app;
    dispatch(addPodcast(app.feed.title, app.feedUrl));
  };
}

export function setCurrentEpisode(episode) {
  return {
    type: SET_CURRENT_EPISODE,
    episode
  };
}
export function normalizePodcastData() {
  return {
    type: NORMALIZE_PODCAST_DATA
  };
}

export function setUrl(url) {
  return {
    type: SET_URL,
    url
  };
}
export function setFeedUrl(feedUrl) {
  return {
    type: SET_FEED_URL,
    feedUrl
  };
}

export function setSearch(searchQuery) {
  return {
    type: SET_SEARCH,
    searchQuery
  };
}
export function setSearchResults(searchResults) {
  return {
    type: SET_SEARCH_RESULTS,
    searchResults
  };
}
export function setCurrentView(currentView) {
  return {
    type: SET_CURRENT_VIEW,
    currentView
  };
}
export function setUrlData(urlData) {
  return {
    type: SET_URL_DATA,
    urlData
  };
}
export function setTopPodcasts(topPodcasts) {
  return {
    type: SET_TOP_PODCASTS,
    topPodcasts
  };
}

export function setPageView(urlstrencoded) {
  let urlstr = decodeURIComponent(urlstrencoded);

  window.location.hash = urlstrencoded;
  return (dispatch, getState) => {
    if (urlstr.startsWith("home")) {
      dispatch(setCurrentView("home"));
      dispatch(setUrlData(urlstr.substring("home".length)));
      dispatch(getTopPodcasts());
    } else if (urlstr.startsWith("player")) {
      dispatch(setCurrentView("player"));
      dispatch(setUrlData(urlstr.substring("player".length)));
      dispatch(fetchPodcast(urlstr.substring("player".length + 1)));
    } else if (urlstr.startsWith("search")) {
      dispatch(setCurrentView("search"));
      dispatch(setUrlData(urlstr.substring("search".length)));
      dispatch(searchPodcast(urlstr.substring("search".length + 1)));
    } else {
      dispatch(setCurrentView("home"));
      dispatch(setUrlData(urlstr.substring("home".length)));
      dispatch(getTopPodcasts());
    }
  };
}

export function fetchPodcastById(id) {
  return (dispatch, getState) => {
    const { rssUrl } = getState().app;
    $.ajax({
      url: "http://itunes.apple.com/lookup",
      data: { id: id, entity: "podcast" },
      type: "GET",
      dataType: "jsonp",
      success: function(data) {
        dispatch(setPageView("player/" + data.results[0].feedUrl));
      }
    });
  };
}

export function subscribePodcastById(id) {
  return (dispatch, getState) => {
    const { rssUrl } = getState().app;
    $.ajax({
      url: "http://itunes.apple.com/lookup",
      data: { id: id, entity: "podcast" },
      type: "GET",
      dataType: "jsonp",
      success: function(data) {
        dispatch(
          addPodcast(data.results[0].trackName, data.results[0].feedUrl)
        );
      }
    });
  };
}

export function searchPodcast(term) {
  return (dispatch, getState) => {
    const { rssUrl } = getState().app;
    $.ajax({
      url: "http://itunes.apple.com/search",
      data: { term: term, entity: "podcast" },
      type: "GET",
      dataType: "jsonp",
      success: function(data) {
        dispatch(setSearchResults(data.results));
      }
    });
  };
}

export function getTopPodcasts() {
  return (dispatch, getState) => {
    const { rssUrl } = getState().app;
    $.ajax({
      url: "https://itunes.apple.com/us/rss/toppodcasts/limit=25/json",
      type: "GET",
      success: function(data) {
        let cats = JSON.parse(data).feed.entry.map((podcast, i) => {
          return podcast.id.attributes["im:id"];
        });
        dispatch(setTopPodcasts(JSON.parse(data).feed.entry));
      }
    });
  };
}

export function PodcastSelect(podcast) {
  return (dispatch, getState) => {
    const { subscribedPodcasts } = getState().app;
    dispatch(setPageView("player/" + subscribedPodcasts[podcast].feedUrl));
  };
}
export function searchSubmit(term) {
  return (dispatch, getState) => {
    let expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    let regex = new RegExp(expression);

    if (term.match(regex)) {
      dispatch(setPageView("player/" + term));
    } else {
      dispatch(setPageView("search/" + term));
    }
  };
}

export function fetchPodcast(rssUrl) {
  return (dispatch, getState) => {
    const { cachedPodcasts } = getState().app;
    if (!!cachedPodcasts[rssUrl]) {
      dispatch(setPodcast(cachedPodcasts[rssUrl]));
      dispatch(setFeedUrl(rssUrl));
      dispatch(normalizePodcastData());
    }
    /*  */

    let yqlUrl =
      "http://query.yahooapis.com/v1/public/yql?q=" +
      encodeURIComponent('select * from xml where url="' + rssUrl + '"') +
      "&format=json";

    /*  fetch(yqlUrl).then(function(response)
    {
      console.log(response);
      function validateInput(jsonData) {
        console.log(jsonData);
        return jsonData.query && jsonData.query.count > 0 ? Promise.resolve(jsonData) : Promise.reject(jsonData);
      }

      function parseData(data) {
        dispatch(setPodcast(data.query.results.rss.channel));
        dispatch(setFeedUrl(rssUrl));
        dispatch(cachePodcast(rssUrl,data.query.results.rss.channel));
        dispatch(normalizePodcastData());


      }

      function errorHandler() {
        console.log("error fetch"+rssurl);
      }

      const responseOkPromise = response.ok ? Promise.resolve(response) : Promise.reject(response);

      responseOkPromise
        .then(response => response.json())
        .then(validateInput)
        .then(parseData)
        .then(undefined, errorHandler);
    }); */
    $.getJSON(
      yqlUrl,
      function(data) {
        if (data.query.count > 0) {
          dispatch(setPodcast(data.query.results.rss.channel));
          dispatch(setFeedUrl(rssUrl));
          dispatch(cachePodcast(rssUrl, data.query.results.rss.channel));
          dispatch(normalizePodcastData());
        }
      }.bind(this)
    );

    /*   // find some demo xml - DuckDuckGo is great for this
    let xmlSource = rssUrl;

// build the yql query. Could be just a string - I think join makes easier reading
    let yqlURLxml = [
        "http://query.yahooapis.com/v1/public/yql",
        "?q=" + encodeURIComponent("select * from xml where url='" + xmlSource + "'"),
        "&format=text&callback=?"
    ].join("");
console.log("xmlxmlxmlxmlxmlxmlxmlxmlxmlxmlxmlxmlxmlxmlxml");
// Now do the AJAX heavy lifting
    $.getJSON(yqlURLxml, function(data){

        console.log(data.results[0]);


    }); */
  };
}

export function incrementAsync() {
  return dispatch => {
    setTimeout(() => {
      dispatch(increment());
    }, 1000);
  };
}
