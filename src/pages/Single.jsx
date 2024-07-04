import React from 'react'
import Edit from '../images/edit.png'
import Delete from '../images/delete.png'
import { Link } from 'react-router-dom'
import Menu from '../components/Menu'

const Single = () => {
  return (
    <div className="single">
      <div className="content">
        <img src="https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />

        <div className="user">
          <img src="https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />

          <div className="info">
            <span>Ronit</span>
            <p>Posted two days ago.</p>
          </div>

          <div className="edit">
            <Link to={`/write?edit=2`}>
            <img src={Edit} alt="" />
            </Link>
            <img src={Delete} alt="" />

          </div>
        </div>
        <h1>Hello Everyobody</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil aliquam dolore iste rem reprehenderit similique. Dolor eum deserunt dolore libero laboriosam reprehenderit ea dignissimos maiores. Dolore placeat fugiat, ea possimus culpa eius eos eaque architecto tempore ad ipsum excepturi. Dicta vitae cum iure, similique blanditiis dignissimos dolorum? Eaque reprehenderit distinctio commodi ullam fugit id, nemo nostrum dolores animi! Doloremque, excepturi quis! Nulla laudantium esse veritatis pariatur, corrupti earum? Veniam ipsam velit iure recusandae fugit cupiditate error quibusdam, esse illo voluptatibus tempora at doloremque neque commodi ratione nesciunt, et blanditiis laboriosam provident tempore deleniti, dolor perferendis suscipit. Nam, officia quis ipsam culpa totam asperiores. Autem nulla fugit veritatis, deserunt itaque qui dolorem! Magni, ab! Corporis mollitia saepe voluptates quas similique, accusamus hic deserunt quod eos distinctio. Porro ex praesentium error amet sapiente impedit non quo fuga. Eveniet libero esse alias impedit illum consectetur? Unde beatae voluptatum repellat optio eveniet nam libero enim numquam fugit, quasi neque eos rerum inventore sit itaque magnam cupiditate necessitatibus expedita mollitia recusandae culpa earum dolores corrupti? Deserunt delectus modi sed pariatur laboriosam eveniet excepturi ex a minus natus assumenda nemo dolorum incidunt nam voluptas inventore maiores praesentium esse expedita suscipit, quis repudiandae est dolorem! Vitae, voluptatem.</p>
      </div>
      <Menu/>
    </div>
  )
}

export default Single
