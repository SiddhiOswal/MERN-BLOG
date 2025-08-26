function Footer() {
    let date = new Date().getFullYear();
  return (
    <footer className='bg-gray-700 text-white p-4 text-center  text-lg md: text-3xl lg:text-4xl'>
      <h1 className='mb-3'>{date} Static Education - MERN Blog Application</h1>
      <p>All rights reserved.</p>
    </footer>
  )
}

export default Footer