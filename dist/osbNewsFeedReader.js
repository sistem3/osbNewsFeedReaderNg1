angular.module('osb-news-feed-template', ['osbNewsFeedReader.tpl.html']);

angular.module("osbNewsFeedReader.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("osbNewsFeedReader.tpl.html",
    "<section class=\"newsFeed\">\n" +
    "    <header>\n" +
    "        <h1 class=\"pull-left\">News <i class=\"fa fa-newspaper-o\"></i></h1>\n" +
    "        <button class=\"btn btn-default pull-right\" ng-click=\"newsFeed.getFeed(newsFeed.feed)\">\n" +
    "            <i class=\"fa fa-refresh\"></i> Refresh\n" +
    "        </button>\n" +
    "        <div class=\"clearfix\"></div>\n" +
    "        <div class=\"newsFeed__selector col-md-6 form-inline\">\n" +
    "            <div class=\"form-group\">\n" +
    "                <select class=\"form-control\" ng-model=\"topFeedsList\" ng-options=\"topFeed.name for topFeed in newsFeed.topFeeds\" ng-change=\"newsFeed.checkFeeds(topFeedsList.feeds)\"></select>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <select class=\"form-control\" ng-model=\"topFeedsListSecondary\" ng-options=\"topFeed.title for topFeed in newsFeed.topFeeds.secondary\" ng-show=\"newsFeed.topFeeds.secondary\"></select>\n" +
    "            </div>\n" +
    "            <button class=\"btn btn-primary form-group\" ng-click=\"newsFeed.getFeed(topFeedsListSecondary.url)\">Go <i class=\"fa fa-chevron-right\"></i></button>\n" +
    "        </div>\n" +
    "        <div class=\"clearfix\"></div>\n" +
    "        <h4 ng-if=\"newsFeed.news.title\">Powered by <span ng-bind=\"newsFeed.news.title\"></span></h4>\n" +
    "    </header>\n" +
    "    <article ng-repeat=\"articles in newsFeed.news.entries\" ng-show=\"!newsFeed.loading\">\n" +
    "        <div class=\"newsFeed__thumbnail\" ng-if=\"articles.thumbnail[1]._url\">\n" +
    "            <img ng-src=\"{{articles.thumbnail[1]._url}}\" alt=\"{{articles.title}}\" />\n" +
    "        </div>\n" +
    "        <div class=\"newsFeed__thumbnail\" ng-if=\"articles.thumbnail._url\">\n" +
    "            <img ng-src=\"{{articles.thumbnail._url}}\" alt=\"{{articles.title}}\" />\n" +
    "        </div>\n" +
    "        <div class=\"newsFeed__content\">\n" +
    "            <h2 ng-bind=\"articles.title\"></h2>\n" +
    "            <p class=\"hidden-xs\" ng-bind-html=\"articles.content\" ng-if=\"articles.content\"></p>\n" +
    "            <small>Published: <span ng-bind-html=\"articles.publishedDate.slice(0, 17) | date:'medium'\"></span> | Source: <span ng-bind=\"newsFeed.news.title\"></span></small>\n" +
    "        </div>\n" +
    "        <a href=\"{{articles.link}}\" class=\"main--link\" target=\"_blank\"><i class=\"fa fa-chevron-right\"></i></a>\n" +
    "        <div class=\"clearfix\"></div>\n" +
    "    </article>\n" +
    "    <div class=\"newsFeed__loading\" ng-show=\"newsFeed.loading\">\n" +
    "        <i class=\"fa fa-spinner fa-spin\"></i>\n" +
    "        <p>Loading...</p>\n" +
    "    </div>\n" +
    "</section>");
}]);

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