
import AuthButton from './AuthButton';

const Banner = ({ title }) => (
  <div className="d-flex justify-content-between align-items-center p-3 bg-light">
    <h1>{title}</h1>
    <AuthButton />
  </div>
);

export default Banner;