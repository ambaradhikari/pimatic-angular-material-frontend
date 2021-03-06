angular.module('pimaticApp').run([
    '$rootScope',
    '$location',
    '$injector',
    '$log',
    'store',
    'auth',
    function ($rootScope, $location, $injector, $log, store, auth) {
        $rootScope.state = 'starting';
        $rootScope.redirectedFrom = null;

        $rootScope.setState = function (state) {
            $rootScope.state = state;
            if (state == 'done' || state == 'unauthenticated') {
                if (!angular.isUndefined($rootScope.redirectedFrom) && $rootScope.redirectedFrom !== null) {
                    $location.path($rootScope.redirectedFrom);
                    $log.debug('New state:', state, 'Redirecting to ', $rootScope.redirectedFrom);
                    $rootScope.redirectedFrom = null;
                } else {
                    $log.debug('New state:', state, 'Redirecting to ', state == 'unauthenticated' ? '/login' : '/home');
                    $location.path(state == 'unauthenticated' ? '/login' : '/home');
                }
            }
        };

        // register listener to watch route changes
        $rootScope.$on('$routeChangeStart', function (event, next/*, current*/) {
            if ($rootScope.state == 'starting') {
                if (next.originalPath != '/loading') {
                    $log.debug('App', 'Application is loading, redirecting to the loading page');
                    $rootScope.redirectedFrom = next.originalPath;
                    $location.path('/loading');
                }
            } else {
                if (!auth.isLoggedIn()) {
                    // no logged user, we should be going to #login
                    if (next.originalPath !== '/login') {
                        // not going to #login, we should redirect now
                        $log.debug('pimaticApp', 'Redirecting to login...');
                        $rootScope.redirectedFrom = next.originalPath;
                        $location.path('/login');
                    }
                }
            }

        });
    }
]);
