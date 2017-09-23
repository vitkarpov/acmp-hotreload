(function() {
    var INTERVAL = 2000;
    var timerId;

    function main() {
        var params = getParams(location.search.substring(1));

        if (params.main !== 'status') {
            return;
        }
        timerId = setInterval(update, INTERVAL);
    }

    function update() {
        return fetch(location)
            .then(function(response) {
                return response.arrayBuffer();
            })
            .then(function(buffer) {
                var decoder = new TextDecoder('windows-1251');
                var html = decoder.decode(buffer);

                var tmp = document.createElement('div');
                tmp.innerHTML = html;

                var curr = document.querySelector('table.main');
                var next = tmp.querySelector('table.main');

                curr.parentNode.insertBefore(next, curr);
                curr.parentNode.removeChild(curr);
            })
            .catch(function(err) {
                clearInterval(timerId);
                console.log('Ooops, something went wrong :( You can file an issue (https://github.com/vitkarpov/acmp-hotreload/issues/new), with this error: ', err);
            });
    }

    function getParams(query) {
        return query.split('&').reduce(function(acc, item) {
            var tmp = item.split('=');
            var key = tmp[0];
            var value = tmp[1];
    
            return acc[key] = value, acc;
        }, {});
    }

    return main;
}())();