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
    "            <small>Published: <span ng-bind-html=\"articles.publishedDate | date:'medium'\"></span> | Source: <span ng-bind=\"newsFeed.news.title\"></span></small>\n" +
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
