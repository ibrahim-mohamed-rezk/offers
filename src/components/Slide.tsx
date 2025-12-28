const Slide = ({
  children,
  className = "",
  gradient = false,
}: {
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
}) => (
  <div
    className={`w-[596px] mx-auto overflow-hidden shadow-2xl print:w-full print:h-[100vh] print:shadow-none print:flex print:flex-col print:justify-center ${className}`}
    style={
      gradient
        ? {
            background:
              "linear-gradient(110deg, rgba(10, 15, 40, 1) 0%, rgba(20, 28, 70, 1) 51%, rgba(10, 15, 40, 1) 100%)",
          }
        : {
            background: "rgba(255, 255, 255, 0.05)",
          }
    }
  >
    {children}
  </div>
);

export default Slide;
