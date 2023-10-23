const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

export default class MicroBlogApiClient{
    constructor(){
        this.base_url = BASE_API_URL + '/api';
    }
    
    async request(options){
        let response = await this.requestInternal(options);
        // when the token is expired, try to refresh it, but not when requesting tokens
        if (response.status === 401 && options.url !== '/tokens'){
            const refreshResponse = await this.put('/tokens/refresh', {
                access_token: localStorage.getItem('accessToken'), 
            });
            // if the refresh was successful, try the original request again
            if (refreshResponse.ok){
                // save the new token to local storage, replacing the expired one
                localStorage.setItem('accessToken', refreshResponse.body.access_token);
                // now try the original request again
                response = await this.requestInternal(options);
            }
        }
        return response;
    }

    async requestInternal(options){
        let query = new URLSearchParams(options.query || {}).toString();
        if (query !== ''){
            query = '?' + query;
        }

        let response;
        try {
            response = await fetch(this.base_url + options.url + query, {

                method: options.method,
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                  ...options.headers,
                },
                // only include tokens to cookies when requesting tokens
                // avoid seding unneccessary cookies by setting credentials to omit
                credentials: options.url ==='/tokens' ? 'include' : 'omit',
                body: options.body ? JSON.stringify(options.body) : null,
            });
            
            // console.log(localStorage.getItem('accessToken'));
            // console.log(this.base_url + options.url + query);
            // console.log(response);

        } catch (error){
            response = {
                ok: false,
                status: 500,
                json: async () => {
                    return { 
                        code: 500,
                        message: 'The server is unresposive',
                        description: error.toString(),
                    };
                }
            };
        }

        return {
            ok: response.ok,
            status: response.status,
            body: response.status !== 204 ? await response.json(): null,
        };
    }

    async get(url, query, options) {
        return this.request({method: 'GET', url, query, ...options});
    }

    async post(url, body, options) {
        return this.request({method: 'POST', url, body, ...options});
    }

    async put(url, body, options) {
        return this.request({method: 'PUT', url, body, ...options});
    }

    async delete(url, options) {
        return this.request({method: 'DELETE', url, ...options});
    }

    async login(username, password) {
        const response = await this.post('/tokens', null, {
          headers: {
            Authorization:  'Basic ' + btoa(username + ":" + password)
          }
        });
        if (!response.ok) {
          return response.status === 401 ? 'fail' : 'error';
        }
        // save the token to local storage
        localStorage.setItem('accessToken', response.body.access_token);
        return 'ok';
      }

    async logout(){
        await this.delete('/tokens');
        localStorage.removeItem('accessToken');
    }

    isAuthenticated() {
        return localStorage.getItem('accessToken') !== null;
    }
}