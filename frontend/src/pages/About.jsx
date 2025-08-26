import image from "../assets/img3.png"
function About() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300 p-4 sm:p-6 lg:p-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* Left Section - Info */}
        <div className="border-2 rounded-2xl p-4 sm:p-6 bg-amber-100 shadow-md">
          <h1 className="font-bold mb-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            About Us
          </h1>
          <p className="text-gray-700 leading-relaxed mb-3 text-justify text-base sm:text-lg md:text-2xl">
           A "Swiftie" is a devoted and passionate fan of the singer-songwriter Taylor Swift. 
           They are known for their deep knowledge of her extensive discography,
           including unreleased songs and "vault tracks."
          </p>
          <p className="text-gray-700 leading-relaxed text-justify text-base sm:text-lg md:text-2xl">
            A true Swiftie celebrates her artistry, deciphers lyrical Easter eggs, and enthusiastically participates in her vibrant 
            and highly engaged fan community.
            Love you Taylor!💘
          </p>
        </div>

        {/* Right Section - Image */}
        <div className="flex justify-center">
          <img
            src={image}
            alt="About"
            className="rounded-2xl shadow-lg w-full max-w-sm sm:max-w-md lg:max-w-lg h-auto"
          />
        </div>

      </div>
    </div>
  );
}

export default About;