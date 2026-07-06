import Link from "next/link"
import type { ReactNode } from "react"

type PublicSiteLayoutProps = {
    children: ReactNode
    title: string
    description?: string
}

export default function PublicSiteLayout({ children, title, description }: PublicSiteLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="sticky top-0 z-50 shadow-lg">
                <header className="bg-red-600 text-white p-4">
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                            <Link href="/" className="text-2xl font-bold hover:text-red-100 transition">
                                LTVFD
                            </Link>
                        </div>
                        <div className="max-w-4xl mx-auto text-center">
                            <p className="text-sm font-semibold italic">Hooiser Pride, Volunteer Heart, Professional Comitment</p>
                        </div>
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                            <Link href="/login" className="bg-white text-red-600 px-4 py-2 rounded hover:bg-gray-100">
                                Employee Login
                            </Link>
                        </div>
                    </div>
                </header>

                <nav className="w-full bg-white border-b border-gray-200">
                    <div className="max-w-6xl mx-auto flex flex-col gap-3 px-6 py-3 lg:flex-row lg:items-center lg:justify-between">
                        <div className="text-sm text-gray-600 lg:w-1/4">
                            3235 N 100 W, Anderson, IN 46011
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-3 text-sm lg:w-2/4">
                            <Link href="/" className="text-base font-semibold text-red-600 hover:text-red-800 transition">
                                Home
                            </Link>
                            <span className="text-gray-300 hidden sm:inline">|</span>
                            <Link href="/events" className="text-base font-semibold text-red-600 hover:text-red-800 transition">
                                Events
                            </Link>
                            <span className="text-gray-300 hidden sm:inline">|</span>
                            <Link href="/contact" className="text-base font-semibold text-red-600 hover:text-red-800 transition">
                                Contact
                            </Link>
                            <span className="text-gray-300 hidden sm:inline">|</span>
                            <Link href="/about" className="text-base font-semibold text-red-600 hover:text-red-800 transition">
                                About
                            </Link>
                            <span className="text-gray-300 hidden sm:inline">|</span>
                            <Link href="/staffing" className="text-base font-semibold text-red-600 hover:text-red-800 transition">
                                Staffing
                            </Link>
                        </div>
                        <div className="hidden lg:block lg:w-1/4"></div>
                    </div>
                </nav>
            </div>

            <main>
                <section className="bg-white py-10">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="rounded-3xl border border-gray-200 bg-white px-8 py-10 shadow-sm">
                            <h1 className="text-4xl font-bold text-red-600">{title}</h1>
                            {description ? <p className="mt-3 text-gray-700 max-w-3xl">{description}</p> : null}
                        </div>
                    </div>
                </section>

                <section className="max-w-6xl mx-auto px-6 py-10">
                    {children}
                </section>
            </main>

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
