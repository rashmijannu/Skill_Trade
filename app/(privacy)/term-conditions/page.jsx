"use client";
import Footer from "@/app/_components/Footer";

const termsSections = [
  {
    title: "Acceptance of Terms",
    content: `Welcome to Skill Trade! These Terms and Conditions ("Terms") govern your use of our website https://skilltrade.com and the services provided by Skill Trade ("we", "us", or "our"). By accessing or using our platform, you agree to comply with and be bound by these Terms & Conditions and our Privacy Policy. Please review these documents carefully before using our services. If you do not agree to these terms, you should not use Skill Trade.`,
    links: [
      { text: "https://skilltrade.com", url: "https://skill-trade-next-15.vercel.app" }
    ]
  },
  {
    title: "Who Can Use Our Platform",
    content: `You must be at least 18 years old and capable of forming legally binding contracts to use the platform. By registering an account, you represent and warrant that you meet these eligibility requirements.`,
  },
  {
    title: "Your Account & Security",
    content: `To access certain features, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Please notify us immediately if you suspect unauthorized access or use of your account.`,
  },
  {
    title: "Community Guidelines",
    content: `All users must behave respectfully toward each other. Harassment, discrimination, fraudulent activity, or any unlawful behavior is strictly prohibited. Skill Trade reserves the right to suspend or terminate accounts engaging in such activities.`,
  },
  {
    title: "Your Responsibilities",
    content: `You are responsible for providing accurate, current, and complete information at all times. You agree not to misuse the platform, not to engage in harmful or illegal behavior, and to follow all applicable laws and regulations.`,
  },
  {
    title: "Booking Cancellations & Refunds",
    content: `Our cancellation and refund policies are outlined during the booking process and in our Refund Policy. Users are encouraged to read these carefully prior to confirming any booking.`,
    links: [
      { text: "Refund Policy", url: "/refund-policy" }
    ]
  },
  {
    title: "Platform Safety & Liability",
    content: `To the fullest extent permitted by law, Skill Trade will not be liable for any damages or losses, including direct, indirect, or incidental damages, arising from your use of the platform or services provided by third parties.`,
  }
];

// Helper function to render content with links
function renderContentWithLinks(content, links) {
  if (!links || links.length === 0) {
    return content;
  }

  let processedContent = content;
  links.forEach(link => {
    processedContent = processedContent.replace(
      link.text,
      `<a href="${link.url}" class="text-black hover:text-gray-600 font-medium border-b border-gray-500 hover:border-gray-500 transition-colors duration-200">${link.text}</a>`
    );
  });

  return <span dangerouslySetInnerHTML={{ __html: processedContent }} />;
}

function Section({ section }) {
  return (
    <div className="mb-10 pb-6 border-b border-gray-100 last:border-b-0">
      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        {section.title}
      </h3>
      <p className="text-gray-700 text-xl leading-relaxed text-justify">
        {renderContentWithLinks(section.content, section.links)}
      </p>
    </div>
  );
}

const Page = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-200 py-16 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto rounded-xl px-2 py-8 md:p-8 lg:p-12">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Terms & Conditions
            </h1>
            <p className="text-gray-600 px-4 text-lg">
              Please read our Terms & Conditions carefully before using Skill Trade.
            </p>
          </div>

          {/* Content Section */}
          <div className="prose prose-lg max-w-none">
            {termsSections.map((section, index) => (
              <Section key={index} section={section} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>

  );
};

export default Page;