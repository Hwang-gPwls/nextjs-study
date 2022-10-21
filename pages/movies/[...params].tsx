import { useRouter } from "next/router";
import Seo from "../../components/Seo";

const Detail = () => {
  const router = useRouter();
  const [title, id]: any = router.query.params || [];

  return (
    <div>
      <Seo title={title} />
      <h4>{title}</h4>
    </div>
  );
};

export default Detail;
