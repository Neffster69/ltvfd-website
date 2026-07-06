import PublicSiteLayout from "@/components/PublicSiteLayout"

export default function About() {
    return (
        <PublicSiteLayout
            title="About"
            description="Learn more about the history, mission, and values behind the Lafayette Township Volunteer Fire Department."
        >
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
                <section className="space-y-6">
                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="text-2xl font-bold text-red-600">Our History</h2>
                        <p className="mt-3 text-gray-700">
                            The Lafayette Township Volunteer Fire Department was founded on the belief that a strong community deserves a fast, dependable response in times of need. Over the years, our station has grown from a small volunteer effort into a dependable resource for neighbors, families, and local leaders.
                        </p>
                        <p className="mt-3 text-gray-700">
                            Our department has remained rooted in service, training, and public support, ensuring we are ready to respond when the call comes in and ready to stand beside the people we protect.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="text-2xl font-bold text-red-600">What We Stand For</h2>
                        <ul className="mt-4 space-y-3 text-gray-700">
                            <li>• Professional service with a volunteer heart</li>
                            <li>• Community outreach and public education</li>
                            <li>• Mutual respect, teamwork, and accountability</li>
                        </ul>
                    </div>
                </section>

                <aside className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h2 className="text-2xl font-bold text-red-600">Mission</h2>
                    <p className="mt-3 text-gray-700">
                        To protect life and property with compassionate, professional emergency response while building lasting relationships with the community we serve.
                    </p>
                    <div className="mt-8 rounded-xl border border-gray-200 bg-white p-4">
                        <h3 className="font-semibold text-gray-900">Community First</h3>
                        <p className="mt-2 text-sm text-gray-600">Whether it is a house fire, a medical emergency, or a public event, our station is proud to support neighbors with honor and dedication.</p>
                    </div>
                </aside>
            </div>
        </PublicSiteLayout>
    )
}