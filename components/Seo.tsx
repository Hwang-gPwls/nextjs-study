import Head from "next/head";

interface ISeoProps {
  title: string;
}

const Seo = ({ title }: ISeoProps) => {
  return (
    <Head>
      <title>{title} | Next Movies</title>
    </Head>
  );
};

export default Seo;
