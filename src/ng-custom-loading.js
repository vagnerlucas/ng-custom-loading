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

            if (attrs.loadingTemplateUrl) {

              $http.get(attrs.loadingTemplateUrl).then(function(d) {

                return Promise.resolve(d.data);

              }, function(e) {

                return Promise.resolve('');

              }).then(function(html) {

                element.html(html);
                $compile(element.contents())(scope);

              });
            } else 
            if (attrs.loadingTemplate) {

              element.html(attrs.loadingTemplate);
              $compile(element.contents())(scope);

            }
            else {

              element.html('');
              $compile(element.contents())(scope);

            }
          } else {

            var htmlComponent = innerHtml;
            element.html(htmlComponent);
            $compile(element.contents())(scope);
            
          }
          
          setTimeout(function() { scope.$digest() }, 300); 
        })
      }
    }
  });