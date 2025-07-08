import OtpForm from '../components/otpForm';

const OtpPage = ({ email, onVerified }) => {
  return (
    <div>
      <OtpForm email={email} onVerify={onVerified} />
    </div>
  );
};

export default OtpPage;
