'use strict';

describe('Directive: newsFeedReader', function () {

  // load the directive's module and view
  beforeEach(module('oneStepBeyondApp'));
  beforeEach(module('app/newsFeedReader/newsFeedReader.tpl.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope, $compile) {
    scope = $rootScope.$new();
    element = angular.element('<news-feed-reader></news-feed-reader>');
    element = $compile(element)(scope);
    scope.$apply();
  }));

  /*it('loading should be true when initialised', function () {
    expect(element.scope().newsFeed.loading).toBe(true);
  });*/
});