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
                    backgroundImage: `url("https://www.google.com/url?sa=i&url=https%3A%2F%2Fdepositphotos.com%2Fvector%2Ffeatures-list-icon-96279150.html&psig=AOvVaw0fURfnqW8fRLzzSr9bDEOq&ust=1752637048378000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCMDgg_n3vY4DFQAAAAAdAAAAABAy")`,
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
                    backgroundImage: "url('https://images.pexels.com/photos/1001435/pexels-photo-1001435.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
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
                    backgroundImage: "url('https://images.pexels.com/photos/142497/pexels-photo-142497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
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
