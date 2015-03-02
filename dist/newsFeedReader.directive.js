'use strict';

angular.module('oneStepBeyondApp', ['templates-main'])
  .directive('newsFeedReader', ['$http', function ($http) {
    return {
      templateUrl: 'newsFeedReader.tpl.html',
      restrict: 'EA',
      link: function ($scope, element, attrs) {
        //console.log("News feed reader added");
        $scope.newsFeed = {};
        $scope.newsFeed.loading = true;

        console.log(attrs.feedUrl);

        if (attrs.feedUrl) {
          $scope.newsFeed.feed = attrs.feedUrl;
        }

        $scope.newsFeed.topFeeds = [];
        $scope.newsFeed.topFeeds.btnEnabled = false;

        var getTopFeeds = function() {
          //console.log("Get feed");
          $http.get('/assets/data/newsFeeds.json').success(function(data) {
            //console.log(data);
            $scope.newsFeed.topFeeds = data;
            $scope.topFeedsList = $scope.newsFeed.topFeeds[0];
          });
        };

        $scope.newsFeed.topFeeds.secondary = [];
        $scope.newsFeed.topFeeds.secondary.feeds = [];

        $scope.newsFeed.checkFeeds = function(feeds) {
          $scope.newsFeed.topFeeds.secondary = [];
          $scope.newsFeed.topFeeds.btnEnabled = false;

          if (feeds.length > 1) {
            //console.log("Show secondary");
            $scope.newsFeed.topFeeds.secondary = feeds;
            $scope.newsFeed.topFeeds.btnEnabled = true;
          }
        };

        $scope.newsFeed.getFeed = function(feedUrl) {
          $scope.newsFeed.feed = feedUrl;
          $scope.newsFeed.loading = true;
          $http.get(feedUrl).success(function(data) {
            //console.log(data.rss.channel);
            $scope.newsFeed.news = [];
            $scope.newsFeed.news = data.rss.channel;
            $scope.newsFeed.loading = false;
          });
        };

        getTopFeeds();
        $scope.newsFeed.getFeed($scope.newsFeed.feed);
      }
    };
  }]);