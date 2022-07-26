import Head from "next/head";
import { signOut } from "next-auth/react";
import { getSession, useSession } from "next-auth/react";
import { Header, Sidebar } from "../components";
import Feed from "../components/Feed";
import { useRouter } from "next/router";

const Home = () => {
const router = useRouter();
  const { statue } = useSession({
    required: true,
    onUnauthenticated: () => {
      router.push("/home");
    }
  });


  return (
    <div className="bg-[#F3F2EF] dark:bg-black dark:text-white h-screen overflow-y-scroll md:space-y-6">
      <Head>
        <title>Feed | LinkedIn</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main className="flex justify-center gap-x-5 px-4 sm:px-12">

        <div className="flex flex-col md:flex-row gap-5">
          <Sidebar />
          <Feed />
        </div>
        {/* <Widgets articles={articles} />
        <AnimatePresence>
          {modalOpen && (
            <Modal handleClose={() => setModalOpen(false)} type={modalType} />
          )}
        </AnimatePresence> */}
      </main>
    </div>
  );
};

export default Home;

export async function getServerSideProps(context) {
  // Check if the user is authenticated on the server...
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/home",
      },
    };
  } else {
    return {
      props: {
        session,
      },
    };
  }
}
