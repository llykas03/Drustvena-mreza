let session = new Session();
session_id = session.getSesion();

if (session_id !== "") {
    let user = new User();
    user.get(session_id);
} else {
    window.location.href = '/';
}

document.querySelector('#logOut').addEventListener('click', e => {
    e.preventDefault();

    session.destroySession();
    window.location.href = '/';
})

// modal

document.querySelector('#editAcc').addEventListener('click', () => {
    document.querySelector('.custom-modal').style.display = 'block';
});
document.querySelector('#clodeModal').addEventListener('click', () => {
    document.querySelector('.custom-modal').style.display = 'none';
});

document.querySelector('#editForm').addEventListener('submit', e => {
    e.preventDefault();

    let user = new User();
    user.username = document.querySelector('#editUsrn').value;
    user.email = document.querySelector('#editEmail').value;
    user.edit();

});

document.querySelector('#deleteProfile').addEventListener('click', e => {
    e.preventDefault();

    let text = 'Da li ste stvarno sigurni da zelite da obrisete profil?';

    if (confirm(text) === true) {
        let user = new User();
        user.delete();
    }
});


document.querySelector('#postForm').addEventListener('submit', e => {
    e.preventDefault();

    async function createPost() {
        let content = document.querySelector('#postContent').value;
        document.querySelector('#postContent').value = '';
        let post = new Post();
        post.post_content = content;
        post = await post.create();

        let current_user = new User();
        current_user = await current_user.get(session_id);

        let html = document.querySelector('#allPostsWrapper').innerHTML;

        let delete_post_html = '';

        if (session_id === post.user_id) {
            delete_post_html = '<button class="remove-btn" onclick"removeMyPost(this)">Remove</button>';
        }

        document.querySelector('#allPostsWrapper').innerHTML = `<div class="single-post" data-post_id="${post.id}">
                                                                    <div class="post-content">${post.content}</div>

                                                                    <div class="post-actions">
                                                                        <p><b>Autor:</b>${username.innerHTML}</p>
                                                                        <div>
                                                                            <button onclick="likePost(this)" class="likePostJS like-btn"><span>${post.likes}</span> likes</button>
                                                                            <button class="comment-btn" onclick="commentPost(this)">Comments</button>
                                                                            ${delete_post_html}
                                                                        </div>
                                                                    </div>

                                                                    <div class="post-comments">
                                                                        <form>
                                                                            <input placeholder="Napisi komentar..." type="text">
                                                                            <button onclick="commentPostSubmit(event)">comment</button>
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                                ` + html;

    }

    createPost();
});

async function getAllPosts() {
    let all_posts = new Post();
    all_posts = await all_posts.getAllPosts();

    all_posts.forEach(post => {
        async function getPostUser() {

            let user = new User();
            user = await user.get(post.user_id);

            let html = document.querySelector('#allPostsWrapper').innerHTML;

            let delete_post_html = '';

            if (session_id === post.user_id) {
                delete_post_html = '<button class="remove-btn" onclick"removeMyPost(this)">Remove</button>';
            }

            document.querySelector('#allPostsWrapper').innerHTML = `<div class="single-post" data-post_id="${post.id}">
                                                                    <div class="post-content">${post.content}</div>

                                                                    <div class="post-actions">
                                                                        <p><b>Autor:</b>${user.username}</p>
                                                                        <div>
                                                                            <button onclick="likePost(this)" class="likePostJS like-btn"><span>${post.likes}</span> likes</button>
                                                                            <button class="comment-btn" onclick="commentPost(this)">Comments</button>
                                                                            ${delete_post_html}
                                                                        </div >
                                                                    </div >
                                                                    <div class="post-comments">
                                                                        <form>
                                                                            <input placeholder="Napisi komentar..." type="text">
                                                                                <button onclick="commentPostSubmit(event)">comment</button>
                                                                        </form>
                                                                    </div>
                                                                </div > ` + html;
            console.log(username);
        }
        getPostUser();
    });
}

getAllPosts();

function commentPostSubmit(event) {
}

const removeMyPost = el => {

}
const likePost = el => {

}
const commentPost = el => {

}