const SectionHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white/20 py-2 px-4 text-center">
    <h3
      className="text-white text-base font-medium"
      style={{ fontFamily: "SST Arabic, Arial, sans-serif" }}
    >
      {children}
    </h3>
  </div>
);

export default SectionHeader;
