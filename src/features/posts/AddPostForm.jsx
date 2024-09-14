import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";
import { addNewPost } from "./postsSlice";
import { useNavigate } from "react-router-dom";


const AddPostForm = () => {
    const [title, setTile] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');
    const [addRequestStatus, setAddRequestStatus] = useState('idle');

    const dispatch = useDispatch();
    const users = useSelector(selectAllUsers);
    const navigate = useNavigate();

    const onTitleChanged = e => setTile(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onAuthorChanged = e => setUserId(e.target.value)
    
    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle';

    const onSavePostClicked = () => {
        if (canSave) {
            try {
                setAddRequestStatus('pending');
                dispatch(addNewPost({ title, body: content, userId })).unwrap();

                setTitle('')
                setContent('')
                setUserId('')
                navigate('/')
            } catch (err) {
                console.error('Failed to save post', err)
            } finally {
                setAddRequestStatus('idle')
            }
        }
    }

    
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