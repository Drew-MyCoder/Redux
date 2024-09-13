import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";
import { postAdded } from "./postsSlice";

const AddPostForm = () => {
    const [title, setTile] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');

    const dispatch = useDispatch();
    const users = useSelector(selectAllUsers);

    const onTitleChanged = e => setTile(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onAuthorChanged = e => setUserId(e.target.value)
    

    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(
                postAdded(title, content, userId)
            )

            setTile('');
            setContent('');
        }
    }

    const canSave = Boolean(title) && Boolean(content) && Boolean(userId);

    const usersOption = users.map(user => (
        <option value={user.id} key={user.id}>
            {user.name}
        </option>
    ))

  return (
    <section>
        <h2>Add a New Post</h2>
        <form action="">
            <label htmlFor="postTitle">Post Title</label>
            <input type="text"
                id="postTitle"
                name="postTitle"
                value={title}
                onChange={onTitleChanged} />

            <label htmlFor="postAuthor">Author:</label>
            <select 
                id="postAuthor"
                value={userId}
                onChange={onAuthorChanged}
            >
                <option value="">

                </option>
                {usersOption}
            </select>

            <label htmlFor="postContent">Post Content</label>
            <textarea 
                name="postContent" 
                id="postContent"
                value={content}
                onChange={onContentChanged}/>
                <button 
                    type="button"
                    onClick={onSavePostClicked}
                    disabled={!canSave}
                >Save Post</button>
        </form>
    </section>
  )
}

export default AddPostForm