import LocalStorageService from './LocalStorageService';

const LIMIT_ARTICLES = 5;

export default class BlogService {
  apiBase = 'https://conduit.productionready.io/api/';

  postRequest() {
    const token = LocalStorageService.getToken();
    const headers = {
      'Content-Type': 'application/json;charset=utf-8',
    };
    if (token) {
      headers.Authorization = `Token ${token}`;
    }
    return headers;
  }

  async getResource(url, postRequest = null) {
    const res = await fetch(url, postRequest);
    return res.json();
  }

  async getListArticles(changeOffset = 1) {
    const offset = (changeOffset - 1) * LIMIT_ARTICLES;
    const url = `${this.apiBase}articles?limit=${LIMIT_ARTICLES}&offset=${offset}`;
    const request = {
      method: 'GET',
      headers: this.postRequest(),
    };
    const res = await this.getResource(url, request);
    return res;
  }

  async getArticle(slug) {
    const url = `${this.apiBase}articles/${slug}`;
    const request = {
      method: 'GET',
      headers: this.postRequest(),
    };
    const res = await this.getResource(url, request);
    return res;
  }

  async setUserRegistration(username, email, password) {
    const url = `${this.apiBase}users`;
    const request = {
      method: 'POST',
      headers: this.postRequest(),
      body: JSON.stringify({
        user: {
          username,
          email,
          password,
        },
      }),
    };
    const res = await this.getResource(url, request);
    return res;
  }

  async getUsers(email, password) {
    const url = `${this.apiBase}users/login`;
    const request = {
      method: 'POST',
      headers: this.postRequest(),
      body: JSON.stringify({
        user: {
          email,
          password,
        },
      }),
    };
    const res = await this.getResource(url, request);
    return res;
  }

  async updateUser(username, email, password, image = null) {
    const url = `${this.apiBase}user`;
    const request = {
      method: 'PUT',
      headers: this.postRequest(),
      body: JSON.stringify({
        user: {
          username,
          email,
          password,
          image,
        },
      }),
    };
    const res = await this.getResource(url, request);
    return res;
  }

  async getCurrentUsers() {
    const url = `${this.apiBase}user`;
    const request = {
      method: 'GET',
      headers: this.postRequest(),
    };
    const res = await this.getResource(url, request);
    return res;
  }

  async createArticle({ title, shortDescription, text, tagList }) {
    const url = `${this.apiBase}articles`;
    const request = {
      method: 'POST',
      headers: this.postRequest(),
      body: JSON.stringify({
        article: {
          title,
          description: shortDescription,
          body: text,
          tagList,
        },
      }),
    };
    const res = await this.getResource(url, request);
    return res;
  }

  async editArticle(title, description, body, tagList, slug) {
    const url = `${this.apiBase}articles/${slug}`;
    const request = {
      method: 'PUT',
      headers: this.postRequest(),
      body: JSON.stringify({
        article: {
          title,
          description,
          body,
          tagList,
        },
      }),
    };
    const res = await this.getResource(url, request);
    return res;
  }

  async deleteArticle(slug) {
    const url = `${this.apiBase}/articles/${slug}`;
    const request = {
      method: 'DELETE',
      headers: this.postRequest(),
    };
    const res = await this.getResource(url, request);
    return res;
  }

  async likeArticle(slug) {
    const url = `${this.apiBase}/articles/${slug}/favorite`;
    const request = {
      method: 'POST',
      headers: this.postRequest(),
    };
    const res = await this.getResource(url, request);
    return res;
  }

  async dislikeArticle(slug) {
    const url = `${this.apiBase}/articles/${slug}/favorite`;
    const request = {
      method: 'DELETE',
      headers: this.postRequest(),
    };
    const res = await this.getResource(url, request);
    return res;
  }
}
