
import DCACalculator from "@/components/DCACalculator";

const Index = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Bitcoin DCA Calculator</h1>
          <p className="text-retro-green/80">Calculate your Bitcoin investment returns using dollar-cost averaging</p>
        </div>
        <DCACalculator />
      </div>
    </div>
  );
};

export default Index;
