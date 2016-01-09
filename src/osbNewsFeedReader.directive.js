'use strict';

angular.module('sistem3.osb-news-feed-reader', ['osb-news-feed-template'])
  .factory('feedReader', function($http) {
    return {
      parseFeed : function(url){
        return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
      }
    }
  })
  .directive('osbNewsFeedReader', ['$http', '$q', 'feedReader', function ($http, $q, feedReader) {
    return {
      templateUrl: 'osbNewsFeedReader.tpl.html',
      restrict: 'EA',
      link: function ($scope, element, attrs) {
        //console.log("News feed reader added");
        $scope.newsFeed = {};
        $scope.newsFeed.loading = true;

        if (attrs.feedUrl) {
          $scope.newsFeed.feed = attrs.feedUrl;
        }

        $scope.newsFeed.getFeed = function(feedUrl) {
          $scope.newsFeed.feed = feedUrl;
          $scope.newsFeed.loading = true;
          feedReader.parseFeed(feedUrl).then(function(data) {
            $scope.newsFeed.news = [];
            $scope.newsFeed.news = data.data.responseData.feed;
            $scope.newsFeed.loading = false;
          });
        };

        $scope.newsFeed.topFeeds = [];
        $scope.newsFeed.topFeeds.btnEnabled = false;

        $scope.newsFeed.topFeeds.secondary = [];
        $scope.newsFeed.topFeeds.secondary.feeds = [];

        $scope.newsFeed.checkFeeds = function(feeds) {
          $scope.newsFeed.topFeeds.secondary = [];
          $scope.newsFeed.topFeeds.btnEnabled = false;

          if (feeds.length > 1) {
            $scope.newsFeed.topFeeds.secondary = feeds;
            $scope.newsFeed.topFeeds.btnEnabled = true;
            $scope.topFeedsListSecondary = $scope.newsFeed.topFeeds.secondary[0];
          }
        };

        $scope.newsFeed.getFeed($scope.newsFeed.feed);
        $scope.newsFeed.topFeeds = [
          {
            "name": "BBC",
            "feeds": [
              {
                "title": "News Front Page",
                "url": "http://feeds.bbci.co.uk/news/rss.xml?edition=uk"
              },
              {
                "title": "World",
                "url": "http://feeds.bbci.co.uk/news/world/rss.xml?edition=uk"
              },
              {
                "title": "UK",
                "url": "http://feeds.bbci.co.uk/news/uk/rss.xml?edition=uk"
              },
              {
                "title": "England",
                "url": "http://feeds.bbci.co.uk/news/england/rss.xml?edition=uk"
              },
              {
                "title": "Northern Ireland",
                "url": "http://feeds.bbci.co.uk/news/northern_ireland/rss.xml?edition=uk"
              },
              {
                "title": "Scotland",
                "url": "http://feeds.bbci.co.uk/news/scotland/rss.xml?edition=uk"
              },
              {
                "title": "Wales",
                "url": "http://feeds.bbci.co.uk/news/wales/rss.xml?edition=uk"
              },
              {
                "title": "Business",
                "url": "http://feeds.bbci.co.uk/news/business/rss.xml?edition=uk"
              },
              {
                "title": "Politics",
                "url": "http://feeds.bbci.co.uk/news/politics/rss.xml?edition=uk"
              },
              {
                "title": "Health",
                "url": "http://feeds.bbci.co.uk/news/health/rss.xml?edition=uk"
              },
              {
                "title": "Education",
                "url": "http://feeds.bbci.co.uk/news/education/rss.xml?edition=uk"
              },
              {
                "title": "Science & Environment",
                "url": "http://feeds.bbci.co.uk/news/science_and_environment/rss.xml?edition=uk"
              },
              {
                "title": "Technology",
                "url": "http://feeds.bbci.co.uk/news/technology/rss.xml?edition=uk"
              },
              {
                "title": "Entertainment",
                "url": "http://feeds.bbci.co.uk/news/entertainment_and_arts/rss.xml?edition=uk"
              }
            ]
          },
          {
            "name": "Reddit",
            "feeds": [
              {
                "title": "r/news",
                "url": "http://www.reddit.com/r/news/.rss"
              },
              {
                "title": "r/pics",
                "url": "http://www.reddit.com/r/pics/.rss"
              },
              {
                "title": "r/webdev",
                "url": "http://www.reddit.com/r/webdev/.rss"
              },
              {
                "title": "r/gaming",
                "url": "http://www.reddit.com/r/gaming/.rss"
              },
              {
                "title": "r/funny",
                "url": "http://www.reddit.com/r/funny/.rss"
              }
            ]
          },
          {
            "name": "Wired",
            "feeds": [
              {
                "title": "WIRED Top Stories",
                "url": "http://feeds.wired.com/wired/index"
              }
            ]
          },
          {
            "name": "Nature",
            "feeds": [
              {
                "title": "Nature - Issue",
                "url": "http://feeds.nature.com/nature/rss/current"
              }
            ]
          },
          {
            "name": "Scientific American",
            "url": "http://feeds.nature.com/scientificamerican/rss/current"
          }
        ];
        $scope.topFeedsList = $scope.newsFeed.topFeeds[0];

        if ($scope.newsFeed.topFeeds[0].feeds.length > 1) {
          $scope.newsFeed.topFeeds.secondary = $scope.newsFeed.topFeeds[0].feeds;
          $scope.topFeedsListSecondary = $scope.newsFeed.topFeeds[0].feeds[0];
        }
      }
    };
  }]);