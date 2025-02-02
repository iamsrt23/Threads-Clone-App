
import UserHeader from '../components/UserHeader'
import UserPost from '../components/UserPost'

const UserPage = () => {
  return (
    <>
    <UserHeader />
    <UserPost likes={1200} replies={481} postImg="../../public/post1.png" postTitle="Let's Talk About Threads"  />
    <UserPost likes={300} replies={41} postImg="../../public/post2.png" postTitle="Let's Talk About FaceBook"  />
    <UserPost likes={1190} replies={1231} postImg="../../public/post3.png" postTitle="Let's Talk About Twitter"  />
    <UserPost likes={2300} replies={5681} postImg="../../public/image.png" postTitle="Happy New Year"  />
    <UserPost likes={123} replies={323} postTitle="This is My First Post" />
    </>
  )
}

export default UserPage