class HttpClient {
    baseUrl: string;

    constructor(url: string) {
        this.baseUrl = url;
    }

    sendAjaxRequest(method: string, additionalString: string, body: ArrayBuffer = null): Promise<any> {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open(method.toUpperCase(), this.baseUrl + additionalString, true);

            xhr.responseType = "json";
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onload = () => {
                if (xhr.status === 200)
                    resolve(xhr.response);
                else
                    reject(xhr.response);
            }

            xhr.onerror = () => {
                reject(xhr.response);
            }
            if (body != null)
                xhr.send(JSON.stringify(body));
            else
                xhr.send(body);
        })
    }
}

export default HttpClient;