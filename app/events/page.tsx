import { db } from "@/lib/db"
import { events } from "@/lib/schema"
import PublicSiteLayout from "@/components/PublicSiteLayout"
import { eq, desc } from "drizzle-orm"

export default async function Events() {
    const eventList = await db.select().from(events).where(eq(events.isPublic, true)).orderBy(desc(events.date))
    const july2026EventDays = eventList
        .map(event => {
            const rawDate = Number(event.date)
            const timestamp = rawDate < 1e12 ? rawDate * 1000 : rawDate
            const eventDate = new Date(timestamp)
            return eventDate.getUTCFullYear() === 2026 && eventDate.getUTCMonth() === 6 ? eventDate.getUTCDate() : null
        })
        .filter((value): value is number => value !== null)

    return (
        <PublicSiteLayout
            title="Events"
            description="From public outreach activities to station gatherings, this page will keep neighbors informed about upcoming events and community involvement."
        >
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                <section className="space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
                            <h2 className="text-2xl font-bold text-red-600">Upcoming Public Events</h2>
                            <span className="rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-red-600 border border-red-100">Community Focused</span>
                        </div>
                        {eventList.length === 0 ? (
                            <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 text-gray-600">
                                <p className="font-semibold">No public events are listed yet.</p>
                                <p className="mt-2">This space will be used for future community events, station open houses, training demonstrations, and public education opportunities.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {eventList.map(event => {
                                    const rawDate = Number(event.date)
                                    const timestamp = rawDate < 1e12 ? rawDate * 1000 : rawDate
                                    const eventDate = new Date(timestamp)

                                    return (
                                        <div key={event.id} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                                            <div className="flex flex-wrap items-center justify-between gap-2">
                                                <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                                                <span className="text-sm font-semibold text-red-600">
                                                    {eventDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                                                </span>
                                            </div>
                                            <p className="mt-2 text-gray-700">{event.description}</p>
                                            {event.location ? <p className="mt-2 text-sm text-gray-600">Location: {event.location}</p> : null}
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </section>

                <aside className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Public Calendar</h2>
                    <p className="text-gray-600 mb-6">A simple calendar view will help neighbors quickly see when outreach events, meetings, and public activities are planned.</p>
                    <div className="rounded-xl border border-gray-200 p-4">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">July 2026</h3>
                            <span className="text-sm font-semibold text-red-600">Public Schedule</span>
                        </div>
                        <div className="grid grid-cols-7 gap-2 text-center text-sm text-gray-500">
                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                                <div key={day} className="font-semibold">{day}</div>
                            ))}
                            {Array.from({ length: 35 }, (_, index) => {
                                const dayNumber = index - 4
                                const isEventDay = july2026EventDays.includes(dayNumber)
                                return (
                                    <div key={index} className={`rounded-lg p-2 ${isEventDay ? 'bg-red-100 text-red-700' : 'bg-white text-gray-600'}`}>
                                        {dayNumber > 0 && dayNumber <= 31 ? dayNumber : ''}
                                    </div>
                                )
                            })}
                        </div>
                        <div className="mt-4 rounded-xl bg-gray-50 p-3 text-sm text-gray-700">
                            {july2026EventDays.length > 0 ? (
                                <p>Highlighted dates show scheduled public events this month.</p>
                            ) : (
                                <p>No public event dates are scheduled for July 2026 yet.</p>
                            )}
                        </div>
                    </div>
                </aside>
            </div>
        </PublicSiteLayout>
    )
}