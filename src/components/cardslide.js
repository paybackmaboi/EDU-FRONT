import React from "react";
const CardSlider = () => (
    <main className="grid gap-4 p-4 max-w-screen-lg mx-auto sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1 */}
        <div className="relative flex items-center justify-center overflow-hidden rounded-lg bg-gray-100 shadow-lg group h-64">
    <div
        className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 ease-out group-hover:scale-110"
        style={{
           backgroundImage: `url("https://cdn-aekfi.nitrocdn.com/BhHUnZmQXkWPzBaLMaTftVhEvszyNTtP/assets/images/source/rev-6880cb6/www.timedoctor.com/blog/images/2023/03/back-office-BPO-1170x658.jpg.webp")`,
        }}
    ></div>

    {/* MODIFIED LINE */}
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60 transition-opacity duration-700 group-hover:opacity-25"></div>
    
    <div className="relative flex flex-col items-center justify-center text-white p-6 z-10 w-full h-full text-center">
        <h2 className="text-lg font-bold">ABOUT</h2>
        <p className="mt-2 italic text-sm">description</p>       
         <a href="#about" className="mt-4 px-4 py-2 bg-gray-900 text-white font-bold text-xs uppercase tracking-wide rounded-lg hover:bg-gray-800 focus:outline-none focus:ring focus:ring-yellow-400">View</a>
   
    </div>
</div>

        {/* Card 2 */}
        <div className="relative flex items-center justify-center overflow-hidden rounded-lg bg-gray-100 shadow-lg group h-64">
            <div
                className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 ease-out group-hover:scale-110"
                style={{
                   backgroundImage:`url("https://thumbs.dreamstime.com/b/businessman-calculating-invoice-young-calculator-desk-214519186.jpg")`,
                }}
            ></div>
           <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60 transition-opacity duration-700 group-hover:opacity-25"></div>
    
    <div className="relative flex flex-col items-center justify-center text-white p-6 z-10 w-full h-full text-center">
        <h2 className="text-lg font-bold">FEATURES</h2>
        <p className="mt-2 italic text-sm">Personalized Journey</p>
        <a href="#features" className="mt-4 px-4 py-2 bg-gray-900 text-white font-bold text-xs uppercase tracking-wide rounded-lg hover:bg-gray-800 focus:outline-none focus:ring focus:ring-yellow-400">View</a>
    </div>
        </div>

        {/* Card 3 */}
        <div className="relative flex items-center justify-center overflow-hidden rounded-lg bg-gray-100 shadow-lg group h-64">
            <div
                className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 ease-out group-hover:scale-110"
                style={{
                   backgroundImage: "url('https://canny.io/blog/wp-content/smush-webp/2023/10/Free-roadmaps.png.webp')",
                }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60 transition-opacity duration-700 group-hover:opacity-25"></div>
    
    <div className="relative flex flex-col items-center justify-center text-white p-6 z-10 w-full h-full text-center">
        <h2 className="text-lg font-bold">ROADMAP</h2>
        <p className="mt-2 italic text-sm">Implementation of Roadmap</p>
        <a href="#roadmaps" className="mt-4 px-4 py-2 bg-gray-900 text-white font-bold text-xs uppercase tracking-wide rounded-lg hover:bg-gray-800 focus:outline-none focus:ring focus:ring-yellow-400">View</a>
    </div>
        </div>

        {/* Card 4 */}
        <div className="relative flex items-center justify-center overflow-hidden rounded-lg bg-gray-100 shadow-lg group h-64">
            <div
                className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 ease-out group-hover:scale-110"
                style={{
                    backgroundImage: "url('https://media.istockphoto.com/id/1489414046/photo/portrait-of-an-attractive-empowered-multiethnic-woman-looking-at-camera-and-charmingly.jpg?s=612x612&w=0&k=20&c=p9-7xtXTjNUUDYJVJmZ2pka98lr2xiFCM1jFLqpgF6Q=')",
                }}
            ></div> 
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60 transition-opacity duration-700 group-hover:opacity-25"></div>
    
    <div className="relative flex flex-col items-center justify-center text-white p-6 z-10 w-full h-full text-center">
        <h2 className="text-lg font-bold">GET STARTED</h2>
        <p className="mt-2 italic text-sm">Create an Account</p>
        <a href="#start" className="mt-4 px-4 py-2 bg-gray-900 text-white font-bold text-xs uppercase tracking-wide rounded-lg hover:bg-gray-800 focus:outline-none focus:ring focus:ring-yellow-400">View</a>
    </div>
        </div>
    </main>
);

export default CardSlider;
