import './styles.css'

import {BsHeart} from 'react-icons/bs'

import {FcLike} from 'react-icons/fc'

import {BiShareAlt} from 'react-icons/bi'

import {FaRegComment} from 'react-icons/fa'

const PostDetails = props => {
  const {postDetails, likePostButton} = props
  const {
    createdAt,
    likesCount,
    postId,
    profilePic,

    userName,
    imageUrl,
    caption,
    comments,
  } = postDetails

  const onClickLikeBtn = () => {
    likePostButton(postId)
  }

  return (
    <li className="post-detailed-card">
      <div className="profile-card">
        <img
          src={profilePic}
          alt="post author profile"
          className="post-author-img"
        />
        <h1 className="author-name"> {userName}</h1>
      </div>

      <div>
        <img src={imageUrl} alt="post" className="post-img" />
      </div>

      <div className="post-bottom-container">
        <button type="button" className="icon-btn" onClick={onClickLikeBtn}>
          <BsHeart className="icon" />
        </button>

        <button type="button" className="icon-btn">
          {' '}
          <BiShareAlt className="icon icon-share" />
        </button>

        <button type="button" className="icon-btn">
          {' '}
          <FaRegComment className="icon" />
        </button>

        <p className="likes-text"> {likesCount} likes</p>
        <p className="caption-text"> {caption}</p>
        <ul className="comments-list-container">
          {comments.map(each => (
            <li key={each.userId}>
              <span className="comment-user-name"> {each.userName}</span>{' '}
              {each.comment}
            </li>
          ))}
        </ul>
        <p className="created-time"> {createdAt}</p>
      </div>
    </li>
  )
}

export default PostDetails

// <button type="button" className="icon-btn">
// <FcLike className="icon" />
//  </button>
