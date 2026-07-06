import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="w-full h-96 bg-cover bg-center relative" style={{ backgroundImage: "url('/firestation-hero.jpg')" }}>
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 text-center text-white flex flex-col justify-center items-center h-full">
          <h1 className="text-5xl font-bold mb-4">Lafayette Township</h1>
          <p className="text-2xl">Volunteer Fire Department</p>
        </div>
      </section>

      <div className="sticky top-0 z-50 shadow-lg">
        <header className="bg-red-600 text-white p-4">
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <h2 className="text-2xl font-bold">LTVFD</h2>
            </div>
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-sm font-semibold italic">Hooiser Pride, Volunteer Heart, Professional Comitment</p>
            </div>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <Link href="/login" className="bg-white text-red-600 px-4 py-2 rounded hover:bg-gray-100">Employee Login</Link>
            </div>
          </div>
        </header>

        <nav className="w-full bg-white">
          <div className="relative">
            <div className="absolute left-6 top-1/2 transform -translate-y-1/2">
              <p className="text-sm text-gray-600">3235 N 100 W, Anderson, IN 46011</p>
            </div>
            <div className="max-w-4xl mx-auto grid grid-cols-3 items-center gap-4 px-6 py-3">
              <div></div>
              <div className="flex justify-center items-center gap-6">
                <Link href="/events" className="text-lg font-semibold text-red-600 hover:text-red-800 transition">Events</Link>
                <div className="text-gray-300">|</div>
                <Link href="/contact" className="text-lg font-semibold text-red-600 hover:text-red-800 transition">Contact</Link>
                <div className="text-gray-300">|</div>
                <Link href="/about" className="text-lg font-semibold text-red-600 hover:text-red-800 transition">About</Link>
                <div className="text-gray-300">|</div>
                <Link href="/staffing" className="text-lg font-semibold text-red-600 hover:text-red-800 transition">Staffing</Link>
              </div>
              <div className="text-right">
                {/* Placeholder for future content */}
              </div>
            </div>
          </div>
        </nav>
      </div>

      <main>
        {/* Staggered Information Sections */}

        {/* Section 1: Our Mission - Left Text, Right Image */}
        <section className="w-full py-12 px-6 lg:px-12 flex flex-col lg:flex-row items-stretch gap-8 bg-gray-100">
          <div className="lg:w-2/5 flex flex-col justify-between">
            <div>
              <h3 className="text-3xl font-bold mb-4 text-red-600">Our Mission</h3>
              <p className="text-gray-700">Here at the Lafayette Township Volunteer Fire Department, we bound with great strides to provide the care, assistance, and comfort as quickly and as professionally as we can. When someone calls 911, it is without a shadow of a doubt, the worst day in their life. Prior to joining the LTVFD, we knew what it was that we were getting into. No matter the problem, no matter the reasons, no matter how far or how long it may take, we will be there to fight the battles you cannot. We give you all that we can and more. Without fear, without doubt, nor without hesitation.</p>
            </div>
          </div>
          <div className="lg:w-3/5 bg-gray-300 rounded-lg h-80 flex items-center justify-center">
            <Image src="/ltvfdmissionsection.png" alt="Our Mission" width={900} height={500} className="rounded-lg object-cover w-full h-full" style={{ objectFit: 'contain', borderRadius: '0.75rem', maxHeight: '100%', maxWidth: '100%' }} />
          </div>
        </section>

        {/* Section 2: 24/7 Service - Left Image, Right Text */}
        <section className="w-full py-12 px-6 lg:px-12 flex flex-col lg:flex-row-reverse items-stretch gap-8">
          <div className="lg:w-2/5 flex flex-col justify-between">
            <div>
              <h3 className="text-3xl font-bold mb-4 text-red-600">24/7 Service</h3>
              <p className="text-gray-700">It does not matter what time, date, or holiday we will be there. As a volunteer station we do not have personnel staying overnight, however that being said many of our team lives within minutes from the station. Throughout the day many of our team will come up to the station and “volunteer”. We have personnel scheduled each day from our main hours; weekdays 8:00a.m.-5:00p.m. at any given time we are likely to have more personnel on the station than scheduled. What can we say? We love what we do! In case of an emergency please call 911 right away, and they will handle the rest in getting us there. In non-emergent scenarios, feel free to call us at (765)-393-0249 for any questions, comments, or concerns you may have. We also love members of the community approaching us in person. Feel free to stop by the station if you are interested in any aspect of our little family here, at LTVFD!</p>
            </div>
          </div>
          <div className="lg:w-3/5 bg-gray-300 rounded-lg h-80 flex items-center justify-center">
            <Image src="/ltvfd247section.png" alt="24/7 Service" width={900} height={500} className="rounded-lg object-cover w-full h-full" style={{ objectFit: 'contain', borderRadius: '0.75rem', maxHeight: '100%', maxWidth: '100%' }} />
          </div>
        </section>

        {/* Section 3: Community First - Left Text, Right Image */}
        <section className="w-full py-12 px-6 lg:px-12 flex flex-col lg:flex-row items-stretch gap-8 bg-gray-100">
          <div className="lg:w-2/5 flex flex-col justify-between">
            <div>
              <h3 className="text-3xl font-bold mb-4 text-red-600">Community First</h3>
              <p className="text-gray-700">There is nothing more important to us than our community. It is the foundation as to why we are here. Here at LTVFD, we consider you as family. We do not care about your background, or if we know you or not, we are family. As family’s do we give each other our all to help however we can. This is not limited to the physical rescue duties we partake in but simply giving back to the community. We love community participation within public events we host or attend. There is a plethora of occasions where we are invited to events in the local towns and cities where we have the opportunity to give back to the community without the hardships of a 911 call. From simple events at schools to show the kids the surface of fire station life, to training events with other departments and stations, and everything in between. Our auxiliary members are wonderful at putting together the public events; you can also reach out to them and see what we can do for you! </p>
            </div>
          </div>
          <div className="lg:w-3/5 bg-gray-300 rounded-lg h-80 flex items-center justify-center">
            <Image src="/ltvfdcomsection.png" alt="Community First" width={900} height={500} className="rounded-lg object-cover w-full h-full" style={{ objectFit: 'contain', borderRadius: '0.75rem', maxHeight: '100%', maxWidth: '100%' }} />
          </div>
        </section>

        {/* LTVFD Emblem */}
        <section className="w-full py-12 px-6 lg:px-12 flex justify-center">
          <Image src="/ltvfdemblem2.png" alt="LTVFD Emblem" width={320} height={240} className="max-w-xs" />
        </section>

      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/events" className="hover:text-red-400">Events</Link></li>
                <li><Link href="/about" className="hover:text-red-400">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-red-400">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact Info</h4>
              <p className="text-gray-300">Emergency: 911</p>
              <p className="text-gray-300">Non Emergency Phone: (765) 393-0249</p>
              <p className="text-gray-300 whitespace-nowrap">Email: oic@lafeyttetownshipfire.org</p>
              <p className="text-gray-300 whitespace-nowrap">Facebook: https://www.facebook.com/lafayettetownshipfire</p>
              <p className="text-gray-300 whitespace-nowrap">Address: 3235 N 100 W, Anderson, IN 46011</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Hours</h4>
              <p className="text-gray-300">Office Hours 8:00a.m.-5:00p.m.</p>
              <p className="text-gray-300">24/7 Emergency Response</p>
              <p className="text-gray-300">Available Always</p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2026 Lafayette Township Volunteer Fire Department. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

