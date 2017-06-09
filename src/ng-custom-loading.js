'use strict'

angular.module('ng-custom-loading', [])
    .directive('customLoading', function($compile, $http) {

    return {
      restrict: 'E',
      replace: false,
      transclude: true,
      template: '<div ng-transclude></div>',
      link: function(scope, element, attrs) {

        var innerHtml = element.children()[0].innerHTML;

        scope.$watch(attrs.isLoading, function(val) {

          if (val) {

            var htmlLoadingTemplate = '';

            if (attrs.loadingTemplate) {

              $http.get(attrs.loadingTemplate).then(function(d) {

                htmlLoadingTemplate = d.data
                return Promise.resolve(htmlLoadingTemplate)

              }, function(e) {

                return Promise.resolve(htmlLoadingTemplate)

              }).then(function(html) {
                element.html(html)
                $compile(element.contents())(scope)
              })
            } else {

              element.html(htmlLoadingTemplate)
              $compile(element.contents())(scope)

            }
          } else {

            var htmlComponent = innerHtml
            element.html(htmlComponent)
            $compile(element.contents())(scope)
            
            setTimeout(function() { scope.$digest() }, 300) 
          }
        })
      }
    }
  });