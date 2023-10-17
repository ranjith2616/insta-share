import './styles.css'

import {BsGrid3X3} from 'react-icons/bs'

import {AiFillCamera} from 'react-icons/ai'

const UserProfileDetails = props => {
  const {userDetails} = props
  const {
    followersCount,
    followingCount,
    postsCount,
    profilePic,
    userBio,
    userName,
    posts,
    stories,
    userId,
  } = userDetails

  return (
    <div className="user-profile-container">
      <div className="user-profile-top-card">
        <img src={profilePic} alt="user profile" className="user-profile-img" />

        <div>
          <h1 className="user-profile-name"> {userName}</h1>
          <div className="user-post-follow-card">
            <p className="user-posts-follow"> {postsCount} posts</p>
            <p className="user-posts-follow"> {followersCount} followers</p>
            <p className="user-posts-follow"> {followingCount} following</p>
          </div>
          <h1 className="user-profile-user-id"> {userId}</h1>
          <p className="user-profile-bio"> {userBio}</p>
        </div>
      </div>

      <div className="mobile-user-bg-container">
        <h1 className="user-profile-name"> {userName}</h1>

        <div className="mobile-user-profile-container">
          <img
            src={profilePic}
            alt="user profile"
            className="user-profile-img"
          />
          <div className="user-post-follow-card">
            <p className="user-posts-follow"> {postsCount} posts</p>
            <p className="user-posts-follow"> {followersCount} followers</p>
            <p className="user-posts-follow"> {followingCount} following</p>
          </div>
        </div>
        <h1 className="user-profile-user-id"> {userId}</h1>
        <p className="user-profile-bio"> {userBio}</p>
      </div>

      <ul className="user-profile-stories-container">
        {stories.map(each => (
          <li key={each.id}>
            <img
              src={each.image}
              alt="user story"
              className="user-stories-images"
            />
          </li>
        ))}
      </ul>

      <span>
        {' '}
        <hr className="hr-line" />
      </span>

      <div className="user-post-container">
        <BsGrid3X3 />
        <h1 className="user-post-name"> Posts</h1>
      </div>

      {posts.length === 0 ? (
        <div className="user-no-post-container">
          <p className="user-no-post-icon">
            {' '}
            <AiFillCamera className="no-post-icon-camera" />
          </p>
          <h1 className="no-post-text"> No Posts Yet</h1>
        </div>
      ) : (
        <ul className="user-post-images-container">
          {posts.map(eachPost => (
            <li key={eachPost.id}>
              {' '}
              <img
                src={eachPost.image}
                alt="user post"
                className="user-post-images"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default UserProfileDetails
