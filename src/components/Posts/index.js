import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import InstaShare from '../../context/InstaShare'

import './styles.css'

import PostDetails from '../PostDetails'

const apiStatusConstraints = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Posts extends Component {
  state = {
    postsData: [],
    api: apiStatusConstraints.initial,
  }

  componentDidMount() {
    const {searchData} = this.context
    console.log(searchData)
    this.getPostData(searchData)
  }

  likePostButton = async id => {
    const {postsData} = this.state

    const url = `https://apis.ccbp.in/insta-share/posts/${id}/like`

    const token = Cookies.get('jwt_token')

    const find = postsData.find(each => each.postId === id)

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id,
        like_status: find.like,
      }),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      if (data.message === 'Post has been disliked') {
        const filteredData = postsData.map(each => {
          if (each.postId === id) {
            return {...each, like: true, likesCount: each.likesCount + 1}
          }
          return each
        })

        this.setState({postsData: filteredData})
      } else if (data.message === 'Post has been liked') {
        const filteredData = postsData.map(each => {
          if (each.postId === id) {
            return {...each, like: false, likesCount: each.likesCount - 1}
          }
          return each
        })
        this.setState({postsData: filteredData})
      }
    }
  }

  getPostData = async searchData => {
    this.setState({api: apiStatusConstraints.inProgress})

    const url = `https://apis.ccbp.in/insta-share/posts?search=${searchData}`
    console.log(url)

    const token = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const updatedData = data.posts.map(each => ({
        createdAt: each.created_at,
        likesCount: each.likes_count,
        postId: each.post_id,
        profilePic: each.profile_pic,
        userId: each.user_id,
        userName: each.user_name,
        postDetails: each.post_details,
        imageUrl: each.post_details.image_url,
        caption: each.post_details.caption,
        comments: each.comments.map(eachComment => ({
          comment: eachComment.comment,
          userId: eachComment.user_id,
          userName: eachComment.user_name,
        })),
        like: false,
      }))

      this.setState({postsData: updatedData, api: apiStatusConstraints.success})
    } else {
      this.setState({api: apiStatusConstraints.failure})
    }
  }

  renderSuccessView = () => {
    const {postsData} = this.state

    return (
      <div>
        <ul className="post-details-container">
          {postsData.map(each => (
            <PostDetails
              key={each.postId}
              postDetails={each}
              likePostButton={this.likePostButton}
            />
          ))}
        </ul>
      </div>
    )
  }

  onTryAgainBtn = () => {
    this.getPostData()
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dmbz5iuha/image/upload/v1697467692/alert-triangle_hlc9v7.png"
        alt="failure view"
        className="alert-img"
      />
      <p className="failure-text">Something went wrong. Please try again</p>
      <button
        type="button"
        className="try-again-btn"
        onClick={this.onTryAgainBtn}
      >
        {' '}
        Try again
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="post-loader-container">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderPostField = () => {
    const {api} = this.state

    switch (api) {
      case apiStatusConstraints.success:
        return this.renderSuccessView()
      case apiStatusConstraints.failure:
        return this.renderFailureView()
      case apiStatusConstraints.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="post-bg-container">
        <div className="post-responsive-container">
          {this.renderPostField()}
        </div>
      </div>
    )
  }
}

Posts.contextType = InstaShare

export default Posts
