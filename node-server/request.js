const request = require('requestify');
const environment = require('./environment');

module.exports = {
    get: (url, res) => {
        return request.request(`${environment.url}${url}`, {
            method: 'GET',
            auth: environment.auth,
            dataType: 'json'
        }).then((response) => {
            res.send(JSON.parse(response.body));
        }).catch((err) => {
            res.send(err.body);
        });
    },
    getWithUrl: (url, res) => {
        return request.request(`${environment.url}${url}`, {
            method: 'GET',
            auth: environment.auth,
            dataType: 'json'
        });
    },

    post: (url, res) => {
        return request.request(`${environment.url}${url}`, {
            method: 'POST',
            auth: environment.auth,
            dataType: 'json'
        }).then((response) => {
            res.send(JSON.parse(response.body));
        }).catch((err) => {
            res.send(err.body);
        });
    },

    postWithUrl: (url) => {
        return request.request(`${environment.url}${url}`, {
            method: 'POST',
            auth: environment.auth,
            dataType: 'json'
        });
    },

    delete: (url, res) => {
        return request.request(`${environment.url}${url}`, {
            method: 'DELETE',
            auth: environment.auth,
            dataType: 'json'
        }).then((response) => {
            res.send(JSON.parse(response.body));
        }).catch((err) => {
            res.send(err.body);
        });
    },

    deleteQF: (url) => {
        return request.request(`${environment.url}${url}`, {
            method: 'POST',
            auth: environment.auth,
            dataType: 'json'
        });
    }


}