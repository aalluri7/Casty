import {
  CACHE_PODCAST,
  SET_FEED_URL,
  SET_TOP_PODCASTS,
  SET_URL_DATA,
  SET_CURRENT_VIEW,
  SET_PODCAST,
  SET_URL,
  SET_CURRENT_EPISODE,
  ADD_PODCAST,
  NORMALIZE_PODCAST_DATA,
  SET_ACTIVE_PODCAST,
  SET_SEARCH,
  SET_SEARCH_RESULTS,
  SET_PAGE_VIEW
} from "../constants/ActionTypes";
import getvalue from "../utils/getvalue";

const initialState = {
  rssUrl: "",
  feedUrl: "",
  searchQuery: "",
  subscribedPodcasts: {},
  cachedPodcasts: {},
  feed: null,
  normalizePodcastData: null,
  currentEpisode: null,
  searchResults: null,
  currentView: "home",
  urlData: "",
  topPodcasts: null
};

function feedNormalizer(feed) {
  let imgurl = getvalue(feed.image, function(x, y) {
    return x == "url" || x == "href";
  });
  console.log(imgurl);

  return Object.assign({}, feed, { image: imgurl });
}

export default function app(state = initialState, action) {
  switch (action.type) {
    case SET_URL:
      return Object.assign({}, state, { rssUrl: action.url });
    case SET_FEED_URL:
      return Object.assign({}, state, { feedUrl: action.feedUrl });
    case SET_PODCAST:
      return Object.assign({}, state, { feed: action.feed });
    case CACHE_PODCAST:
      return Object.assign({}, state, {
        cachedPodcasts: Object.assign({}, state.cachedPodcasts, {
          [action.feedUrl]: action.feed
        })
      });
    case SET_SEARCH:
      return Object.assign({}, state, { searchQuery: action.searchQuery });
    case SET_CURRENT_EPISODE:
      return Object.assign({}, state, { currentEpisode: action.episode });
    case ADD_PODCAST:
      return Object.assign({}, state, {
        subscribedPodcasts: Object.assign({}, state.subscribedPodcasts, {
          [action.podcastName]: {
            name: action.podcastName,
            feedUrl: action.feedUrl
          }
        })
      });
    case NORMALIZE_PODCAST_DATA:
      return Object.assign({}, state, { feed: feedNormalizer(state.feed) });
    case SET_ACTIVE_PODCAST:
      return Object.assign({}, state, {
        feed: state.subscribedPodcasts[action.podcastName].feed
      });
    case SET_SEARCH_RESULTS:
      return Object.assign({}, state, { searchResults: action.searchResults });
    case SET_CURRENT_VIEW:
      return Object.assign({}, state, { currentView: action.currentView });
    case SET_URL_DATA:
      return Object.assign({}, state, { urlData: action.urlData });
    case SET_TOP_PODCASTS:
      return Object.assign({}, state, { topPodcasts: action.topPodcasts });
    default:
      return state;
  }
}
