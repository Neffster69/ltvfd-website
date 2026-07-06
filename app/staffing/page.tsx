import Image from "next/image"
import PublicSiteLayout from "@/components/PublicSiteLayout"

const staffMembers = [
    {
        name: "Chief John Doe",
        rank: "Fire Chief",
        image: "/staffing/chief.svg",
        bio: "Leads the department with an emphasis on readiness, safety, and community trust."
    },
    {
        name: "Captain Jane Smith",
        rank: "Operations Captain",
        image: "/staffing/captain.svg",
        bio: "Coordinates response readiness and oversees day-to-day operational planning."
    },
    {
        name: "Lieutenant Bob Johnson",
        rank: "Training Lieutenant",
        image: "/staffing/lieutenant.svg",
        bio: "Guides training standards and helps prepare members for service in the field."
    }
]

export default function Staffing() {
    return (
        <PublicSiteLayout
            title="Staffing"
            description="Meet the current ranking officials who help guide the department and support the mission of service to the community."
        >
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {staffMembers.map(member => (
                    <div key={member.name} className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                        <div className="bg-red-50 p-4">
                            <Image src={member.image} alt={member.name} width={480} height={640} className="h-72 w-full rounded-xl object-cover" />
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                            <p className="mt-1 font-medium text-red-600">{member.rank}</p>
                            <p className="mt-3 text-sm text-gray-600">{member.bio}</p>
                        </div>
                    </div>
                ))}
            </div>
        </PublicSiteLayout>
    )
}