angular.module('news-feed-template', ['newsFeedReader.tpl.html']);

angular.module("newsFeedReader.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("newsFeedReader.tpl.html",
    "<section class=\"newsFeed\">\n" +
    "    <header>\n" +
    "        <h1 class=\"pull-left\">News <i class=\"fa fa-newspaper-o\"></i></h1>\n" +
    "        <button class=\"btn btn-default pull-right\" ng-click=\"newsFeed.getFeed(newsFeed.feed)\">\n" +
    "            <i class=\"fa fa-refresh\"></i> Refresh\n" +
    "        </button>\n" +
    "        <div class=\"clearfix\"></div>\n" +
    "        <div class=\"newsFeed__selector col-md-6 form-inline\">\n" +
    "            <select class=\"form-control\" ng-model=\"topFeedList\" ng-options=\"topFeed.name for topFeed in newsFeed.topFeeds\" ng-change=\"newsFeed.checkFeeds(topFeedList.feeds)\"></select>\n" +
    "            <select class=\"form-control\" ng-model=\"topFeedListSecondary\" ng-options=\"topFeed.title for topFeed in newsFeed.topFeeds.secondary\" ng-show=\"newsFeed.topFeeds.secondary\"></select>\n" +
    "            <button class=\"btn btn-primary form-group\" ng-click=\"newsFeed.getFeed(topFeedListSecondary.url)\">Go <i class=\"fa fa-chevron-right\"></i></button>\n" +
    "        </div>\n" +
    "    </header>\n" +
    "    <article ng-repeat=\"articles in newsFeed.news.item\" ng-show=\"!newsFeed.loading\">\n" +
    "        <div class=\"newsFeed__thumbnail\" ng-if=\"articles.thumbnail[1]._url\">\n" +
    "            <img ng-src=\"{{articles.thumbnail[1]._url}}\" alt=\"{{articles.title}}\" />\n" +
    "        </div>\n" +
    "        <div class=\"newsFeed__thumbnail\" ng-if=\"articles.thumbnail._url\">\n" +
    "            <img ng-src=\"{{articles.thumbnail._url}}\" alt=\"{{articles.title}}\" />\n" +
    "        </div>\n" +
    "        <div class=\"newsFeed__content\">\n" +
    "            <h2 ng-bind=\"articles.title\"></h2>\n" +
    "            <p class=\"hidden-xs\" ng-bind-html=\"articles.description\"></p>\n" +
    "            <small>Published: <span ng-bind-html=\"articles.pubDate | date:'medium'\"></span> | Source: <span ng-bind=\"newsFeed.news.title\"></span> | <a href=\"{{articles.link}}\">Link <i class=\"fa fa-external-link\"></i></a></small>\n" +
    "        </div>\n" +
    "        <div class=\"clearfix\"></div>\n" +
    "    </article>\n" +
    "    <div class=\"newsFeed__loading\" ng-show=\"newsFeed.loading\">\n" +
    "        <i class=\"fa fa-spinner fa-spin\"></i>\n" +
    "        <p>Loading...</p>\n" +
    "    </div>\n" +
    "</section>");
}]);
