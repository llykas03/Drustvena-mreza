class Post {
    post_id = '';
    post_content = '';
    euser_id = '';
    likes = '';
    api_url = 'https://62fc0e97e4bcaf5351917d3e.mockapi.io';

    async create(post_content) {
        let session = new Session();
        session_id = session.getSesion();

        let data = {
            user_id: session_id,
            content: this.post_content,
            likes: 0
        }

        data = JSON.stringify(data);

        let response = await fetch(this.api_url + '/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });

        data = await response.json();

        return data;
    }

    async getAllPosts() {
        let response = await fetch(this.api_url + '/posts');
        let data = await response.json();
        return data;
    }
}