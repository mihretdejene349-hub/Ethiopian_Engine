import React, { useState, useEffect } from 'react';
import { 
  Car, Shield, Globe, Award, ChevronRight, Phone, Mail, MapPin, 
  Search, Calculator, ArrowRight, CheckCircle2, Star, Sparkles, 
  Clock, Compass, Users, FileText, ChevronDown, Menu, X, Play, 
  ExternalLink, UserCheck, Key, Anchor, DollarSign, RefreshCw
} from 'lucide-react';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [calcCarType, setCalcCarType] = useState('luxury');
  const [calcVal, setCalcVal] = useState(45000);
  const [trackingId, setTrackingId] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);

  // Tracking database mock
  const mockShipments = {
    'EE-9021': { status: 'In Transit - Red Sea', est: '5 Days', car: '2024 Mercedes-Benz G 63 AMG', progress: 75, origin: 'Djibouti Hub', dest: 'Addis Ababa' },
    'EE-8812': { status: 'Customs Clearance', est: '2 Days', car: '2023 Porsche Cayenne Turbo GT', progress: 90, origin: 'Modjo Dry Port', dest: 'Showroom' },
    'EE-9540': { status: 'Sourced & Verified', est: '14 Days', car: '2024 Toyota Land Cruiser V6 LC300', progress: 30, origin: 'International Port', dest: 'Djibouti' }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const inventory = [
    {
      id: 1,
      name: '2024 Mercedes-Benz G 63 AMG',
      category: 'suv',
      price: '$185,000',
      specs: '4.0L V8 Biturbo • 577 HP • 0-100km/h 4.5s',
      image: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=1000&q=80',
      tag: 'Ready for Import'
    },
    {
      id: 2,
      name: '2023 Porsche 911 GT3 RS',
      category: 'sports',
      price: '$295,000',
      specs: '4.0L Flat-6 • 518 HP • PDK 7-Speed',
      image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1000&q=80',
      tag: 'Reserved'
    },
    {
      id: 3,
      name: '2024 Land Cruiser 300 VX-R',
      category: 'suv',
      price: '$128,000',
      specs: '3.5L V6 Twin-Turbo • 409 HP • 10-Speed AT',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=80',
      tag: 'In Transit'
    },
    {
      id: 4,
      name: '2024 Range Rover Autobiography',
      category: 'luxury',
      price: '$210,000',
      specs: '4.4L Twin-Turbo V8 • Executive Class rear seating',
      image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1000&q=80',
      tag: 'Sourced'
    },
    {
      id: 5,
      name: '2023 BMW M5 CS',
      category: 'sports',
      price: '$165,000',
      specs: '4.4L V8 • 627 HP • Lightweight Carbon Frame',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1000&q=80',
      tag: 'Available'
    },
    {
      id: 6,
      name: '2024 Rolls-Royce Cullinan',
      category: 'luxury',
      price: '$480,000',
      specs: '6.75L V12 Twin-Turbo • Bespoke Ethiopian Leather Trim',
      image: 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&w=1000&q=80',
      tag: 'VVIP Exclusive'
    }
  ];

  const filteredCars = activeTab === 'all' 
    ? inventory 
    : inventory.filter(c => c.category === activeTab);

  const calculateDuty = () => {
    const base = calcVal;
    let multiplier = 1.85; 
    if (calcCarType === 'electric') multiplier = 1.15; 
    if (calcCarType === 'commercial') multiplier = 1.35;
    if (calcCarType === 'luxury') multiplier = 2.10;

    const totalEst = Math.round(base * multiplier);
    const taxPart = totalEst - base;
    return { totalEst, taxPart };
  };

  const handleTrackSearch = (e) => {
    e.preventDefault();
    const cleanId = trackingId.trim().toUpperCase();
    if (mockShipments[cleanId]) {
      setTrackingResult(mockShipments[cleanId]);
    } else {
      setTrackingResult({ error: 'Shipment ID not found. Try EE-9021, EE-8812, or EE-9540.' });
    }
  };

  const { totalEst, taxPart } = calculateDuty();

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-amber-500 selection:text-black">
      
      {/* TOP HEADER / BAR */}
      <div className="bg-neutral-900/80 border-b border-neutral-800 text-xs py-2 px-4 md:px-8 flex justify-between items-center backdrop-blur-md">
        <div className="flex items-center gap-6 text-neutral-400">
          <span className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-amber-500" /> Bole Road, Addis Ababa, Ethiopia</span>
          <span className="hidden md:flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-amber-500" /> +251 (0) 11 690 8888</span>
        </div>
        <div className="flex items-center gap-4 text-neutral-400">
          <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider">ETHIOPIA LUXURY DIRECT</span>
          <span className="hidden sm:inline">Concierge Hours: Mon - Sat 8:00 - 20:00 EAT</span>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800 py-3 shadow-2xl' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-300 p-0.5 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-neutral-950 rounded-[7px] flex items-center justify-center">
                <Car className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white block leading-none font-serif">ETHIOPIAN <span className="text-amber-500">ENGINE</span></span>
              <span className="text-[10px] tracking-widest text-neutral-400 uppercase font-mono">AUTOMOTIVE IMPORTS</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-neutral-300">
            <a href="#about" className="hover:text-amber-400 transition-colors">Our Legacy</a>
            <a href="#inventory" className="hover:text-amber-400 transition-colors">Curated Fleet</a>
            <a href="#calculator" className="hover:text-amber-400 transition-colors">Import Duty Portal</a>
            <a href="#tracking" className="hover:text-amber-400 transition-colors">Live Vessel Tracking</a>
            <a href="#membership" className="hover:text-amber-400 transition-colors">Private Club</a>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <a href="#contact" className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-neutral-950 font-semibold px-5 py-2.5 rounded-lg transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 text-sm flex items-center gap-2">
              <span>Consult Concierge</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-neutral-300 p-2">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-neutral-900 border-b border-neutral-800 px-6 py-6 space-y-4">
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block text-neutral-200 py-1">Our Legacy</a>
            <a href="#inventory" onClick={() => setMobileMenuOpen(false)} className="block text-neutral-200 py-1">Curated Fleet</a>
            <a href="#calculator" onClick={() => setMobileMenuOpen(false)} className="block text-neutral-200 py-1">Import Duty Portal</a>
            <a href="#tracking" onClick={() => setMobileMenuOpen(false)} className="block text-neutral-200 py-1">Live Vessel Tracking</a>
            <a href="#membership" onClick={() => setMobileMenuOpen(false)} className="block text-neutral-200 py-1">Private Club</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block text-center bg-amber-500 text-neutral-950 font-semibold py-3 rounded-lg">
              Consult Concierge
            </a>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-12 pb-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=80" 
            alt="Luxury Automobile" 
            className="w-full h-full object-cover opacity-25 filter brightness-75 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent" />
          <div className="absolute inset-0 bg-radial-at-c from-transparent via-neutral-950/50 to-neutral-950" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900/90 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-8 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Ethiopia’s Premier International Auto House</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 font-serif leading-[1.1]">
            Global Engineering.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">
              Ethiopian Prestige.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-neutral-300 mb-10 font-light leading-relaxed">
            Seamlessly importing luxury, sports, and commercial automobiles with end-to-end customs clearance, VIP shipping logistics, and elite private member services.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#inventory" className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-bold px-8 py-4 rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all shadow-xl shadow-amber-500/20 text-center flex items-center justify-center gap-2">
              <Search className="w-5 h-5" />
              <span>Explore Sourced Fleet</span>
            </a>
            <a href="#calculator" className="w-full sm:w-auto bg-neutral-900 hover:bg-neutral-800 text-neutral-200 font-semibold px-8 py-4 rounded-xl border border-neutral-700 transition-all text-center flex items-center justify-center gap-2">
              <Calculator className="w-5 h-5 text-amber-500" />
              <span>Duty Estimator</span>
            </a>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-neutral-800/80 max-w-4xl mx-auto">
            <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800/50">
              <div className="text-3xl font-bold text-amber-400 font-serif">450+</div>
              <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider">Cars Delivered</div>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800/50">
              <div className="text-3xl font-bold text-amber-400 font-serif">100%</div>
              <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider">Customs Compliance</div>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800/50">
              <div className="text-3xl font-bold text-amber-400 font-serif">21 Days</div>
              <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider">Avg. Transit Time</div>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800/50">
              <div className="text-3xl font-bold text-amber-400 font-serif">24/7</div>
              <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider">VIP Concierge</div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY ETHIOPIAN ENGINE */}
      <section id="about" className="py-24 bg-neutral-900/50 relative border-y border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-semibold text-amber-500 tracking-widest uppercase mb-3">Redefining Importation</h2>
            <p className="text-3xl md:text-5xl font-bold text-white font-serif">Crafted for Quality & Absolute Trust</p>
            <p className="text-neutral-400 mt-4 leading-relaxed">
              Navigating Ethiopian auto import laws requires deep regulatory mastery, global sourcing networks, and uncompromised standards.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-neutral-950 p-8 rounded-2xl border border-neutral-800 hover:border-amber-500/40 transition-all group">
              <div className="w-14 h-14 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
                <Globe className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Global Network Sourcing</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Direct partnerships with verified dealerships in Germany, UAE, USA, Japan, and the UK ensuring authentic luxury vehicle history and pristine condition.
              </p>
            </div>

            <div className="bg-neutral-950 p-8 rounded-2xl border border-neutral-800 hover:border-amber-500/40 transition-all group">
              <div className="w-14 h-14 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Full Customs & Tax Handling</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Complete transparency on Ministry of Revenue regulations, tariff valuation, tax exemptions, and Modjo / Djibouti port expedited releases.
              </p>
            </div>

            <div className="bg-neutral-950 p-8 rounded-2xl border border-neutral-800 hover:border-amber-500/40 transition-all group">
              <div className="w-14 h-14 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">White-Glove Handover</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Detailing, mechanical inspection, Addis Ababa license plate registration, and doorstep flatbed transport direct to your residence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CURATED FLEET INVENTORY */}
      <section id="inventory" className="py-24 max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-xs font-semibold text-amber-500 tracking-widest uppercase mb-3">Exclusive Selection</h2>
            <p className="text-3xl md:text-4xl font-bold text-white font-serif">Featured Sourced Automobiles</p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
            {['all', 'luxury', 'sports', 'suv'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeTab === tab
                    ? 'bg-amber-500 text-neutral-950 font-bold shadow-lg shadow-amber-500/20'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                {tab === 'all' ? 'All Vehicles' : tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car) => (
            <div key={car.id} className="bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 hover:border-neutral-700 transition-all flex flex-col group">
              <div className="relative h-60 overflow-hidden">
                <img 
                  src={car.image} 
                  alt={car.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute top-4 left-4 bg-neutral-950/80 backdrop-blur-md text-amber-400 border border-amber-500/30 text-[10px] uppercase font-bold px-3 py-1 rounded-full">
                  {car.tag}
                </div>
                <div className="absolute bottom-4 right-4 bg-neutral-950/90 text-white font-mono font-bold px-3 py-1.5 rounded-lg text-sm border border-neutral-800">
                  {car.price}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white font-serif mb-2 group-hover:text-amber-400 transition-colors">{car.name}</h3>
                  <p className="text-neutral-400 text-xs mb-6 leading-relaxed font-mono">{car.specs}</p>
                </div>

                <a 
                  href="#contact" 
                  className="w-full bg-neutral-800 hover:bg-amber-500 hover:text-neutral-950 text-neutral-200 font-semibold py-3 rounded-xl border border-neutral-700 hover:border-amber-500 transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <span>Request Allocation</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DYNAMIC IMPORT DUTY CALCULATOR */}
      <section id="calculator" className="py-24 bg-neutral-900/60 border-y border-neutral-800 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold mb-4 border border-amber-500/20">
                <Calculator className="w-3.5 h-3.5" />
                <span>Instant Transparency Tool</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white font-serif mb-6">Ethiopian Import Duty & Tax Estimator</h2>
              <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                Vehicle importation into Ethiopia involves custom tariffs, Excise Tax, VAT, SurTax, and Withholding. Calculate estimated total cost for seamless budget planning.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">Green Energy Exemption Rates</h4>
                    <p className="text-xs text-neutral-400">Substantially reduced duties on 100% Electric Vehicles (EVs).</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">Turnkey Port Clearance Included</h4>
                    <p className="text-xs text-neutral-400">Includes freight, insurance, and transit logistics from Djibouti port.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-neutral-950 p-6 md:p-8 rounded-3xl border border-neutral-800 shadow-2xl">
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-400 mb-2">Vehicle Type & Classification</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'luxury', label: 'Luxury Passenger' },
                      { id: 'electric', label: 'EV Electric Car' },
                      { id: 'commercial', label: 'SUV / Commercial' }
                    ].map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setCalcCarType(type.id)}
                        className={`p-3 rounded-xl border text-xs font-semibold transition-all ${
                          calcCarType === type.id 
                            ? 'bg-amber-500/10 border-amber-500 text-amber-400' 
                            : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold uppercase text-neutral-400 mb-2">
                    <span>FOB Vehicle Price (USD)</span>
                    <span className="text-amber-400 font-mono text-sm">${calcVal.toLocaleString()}</span>
                  </div>
                  <input 
                    type="range" 
                    min="15000" 
                    max="300000" 
                    step="5000" 
                    value={calcVal} 
                    onChange={(e) => setCalcVal(Number(e.target.value))}
                    className="w-full accent-amber-500 bg-neutral-800 rounded-lg h-2 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-500 mt-1 font-mono">
                    <span>$15,000</span>
                    <span>$150,000</span>
                    <span>$300,000+</span>
                  </div>
                </div>

                {/* Calculation Output */}
                <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-neutral-400">Base FOB Price:</span>
                    <span className="font-mono text-white">${calcVal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-neutral-400">Est. Tax, Duties & Logistics:</span>
                    <span className="font-mono text-amber-400">+${taxPart.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-neutral-800 pt-4 flex justify-between items-center">
                    <div>
                      <span className="text-sm font-bold text-white block">Estimated Total Landed Cost</span>
                      <span className="text-[10px] text-neutral-400">Delivered & Duty Paid in Addis Ababa</span>
                    </div>
                    <span className="text-2xl font-bold font-mono text-amber-400">${totalEst.toLocaleString()}</span>
                  </div>
                </div>

                <div className="text-[11px] text-neutral-500 italic">
                  *Note: Tax rates are indicative estimates based on current Ministry of Revenue tariff structures. Formal quotation will be supplied by our customs attorneys.
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SHIPMENT TRACKING */}
      <section id="tracking" className="py-24 max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold mb-4 border border-amber-500/20">
              <Anchor className="w-3.5 h-3.5" />
              <span>Real-Time Member Logistics</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-serif mb-4">Track Your Imported Vehicle</h2>
            <p className="text-neutral-400 text-sm mb-8">
              Enter your Ethiopian Engine Dossier or Tracking ID to get live status updates from sea transit to Djibouti Port and Modjo Dry Port.
            </p>

            <form onSubmit={handleTrackSearch} className="flex flex-col sm:flex-row gap-3 mb-8">
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  value={trackingId} 
                  onChange={(e) => setTrackingId(e.target.value)}
                  placeholder="Try 'EE-9021', 'EE-8812', or 'EE-9540'" 
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition-all font-mono"
                />
              </div>
              <button 
                type="submit" 
                className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 text-sm"
              >
                <span>Check Status</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Tracking Result Box */}
            {trackingResult && (
              <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 mt-6 animate-fadeIn">
                {trackingResult.error ? (
                  <p className="text-red-400 text-xs font-mono">{trackingResult.error}</p>
                ) : (
                  <div className="space-y-4">
                    <div className="flex flex-wrap justify-between items-start gap-4">
                      <div>
                        <span className="text-[10px] font-mono text-neutral-500 uppercase block">Vehicle Description</span>
                        <h4 className="text-base font-bold text-white font-serif">{trackingResult.car}</h4>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-mono text-neutral-500 uppercase block">Current Phase</span>
                        <span className="inline-block px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full text-xs font-bold">
                          {trackingResult.status}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-neutral-400 font-mono">
                        <span>Origin: {trackingResult.origin}</span>
                        <span>Destination: {trackingResult.dest}</span>
                      </div>
                      <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-amber-500 h-full rounded-full transition-all duration-1000"
                          style={{ width: `${trackingResult.progress}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[11px] text-neutral-500">
                        <span>Progress: {trackingResult.progress}%</span>
                        <span>Est. Arrival: <strong className="text-neutral-300">{trackingResult.est}</strong></span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </section>

      {/* PRIVATE CLUB & MEMBERSHIP */}
      <section id="membership" className="py-24 bg-neutral-900/40 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-semibold text-amber-500 tracking-widest uppercase mb-3">Bespoke Concierge</h2>
            <p className="text-3xl md:text-5xl font-bold text-white font-serif">Ethiopian Engine Private Club</p>
            <p className="text-neutral-400 mt-4 leading-relaxed">
              Designed for collectors, diplomats, business leaders, and enthusiasts seeking priority sourcing allocations and privileged access.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Gold Tier */}
            <div className="bg-neutral-950 p-8 rounded-3xl border border-neutral-800 hover:border-neutral-700 transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-amber-400 tracking-wider uppercase block mb-2">Member Level I</span>
                <h3 className="text-2xl font-bold text-white font-serif mb-4">Privilege Tier</h3>
                <p className="text-neutral-400 text-xs leading-relaxed mb-6">Standard bespoke sourcing and white-glove import management for executive sedans & SUVs.</p>
                <ul className="space-y-3 text-xs text-neutral-300 mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-500" /> Dedicated Import Specialist</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-500" /> Door-to-Door Flatbed Transport</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-500" /> Complete Registration & Plates</li>
                </ul>
              </div>
              <a href="#contact" className="w-full text-center bg-neutral-900 hover:bg-neutral-800 text-neutral-200 py-3 rounded-xl border border-neutral-700 text-xs font-semibold">Join Concierge</a>
            </div>

            {/* Platinum Tier */}
            <div className="bg-neutral-950 p-8 rounded-3xl border-2 border-amber-500/80 shadow-xl shadow-amber-500/10 flex flex-col justify-between relative scale-105 my-2 md:my-0">
              <div className="absolute -top-3 right-8 bg-amber-500 text-neutral-950 font-bold text-[10px] uppercase px-3 py-1 rounded-full">
                Most Requested
              </div>
              <div>
                <span className="text-xs font-bold text-amber-400 tracking-wider uppercase block mb-2">Member Level II</span>
                <h3 className="text-2xl font-bold text-white font-serif mb-4">Diplomatic & Elite</h3>
                <p className="text-neutral-400 text-xs leading-relaxed mb-6">Tailored specifically for international diplomats, NGOs, and high-net-worth individuals requiring tax-duty exemptions.</p>
                <ul className="space-y-3 text-xs text-neutral-300 mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-500" /> Duty-Free Legal Clearance Expediting</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-500" /> Priority Vessel Booking Slots</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-500" /> Complimentary 1-Year Maintenance Cover</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-500" /> 24/7 Roadside Assistance in Ethiopia</li>
                </ul>
              </div>
              <a href="#contact" className="w-full text-center bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold py-3 rounded-xl text-xs font-semibold">Inquire Tier Privileges</a>
            </div>

            {/* VVIP Tier */}
            <div className="bg-neutral-950 p-8 rounded-3xl border border-neutral-800 hover:border-neutral-700 transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-amber-400 tracking-wider uppercase block mb-2">Member Level III</span>
                <h3 className="text-2xl font-bold text-white font-serif mb-4">Besproke Collector</h3>
                <p className="text-neutral-400 text-xs leading-relaxed mb-6">Direct access to ultra-rare supercar allocations, hypercars, and armored security vehicles.</p>
                <ul className="space-y-3 text-xs text-neutral-300 mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-500" /> Direct Factory Build Allocations</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-500" /> VR4-VR7 Armored Vehicles Handling</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-500" /> Private Aviation Cargo Sourcing</li>
                </ul>
              </div>
              <a href="#contact" className="w-full text-center bg-neutral-900 hover:bg-neutral-800 text-neutral-200 py-3 rounded-xl border border-neutral-700 text-xs font-semibold">Request Confidential Brief</a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contact" className="py-24 max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-xs font-semibold text-amber-500 tracking-widest uppercase">Start Your Journey</h2>
            <p className="text-3xl md:text-4xl font-bold text-white font-serif">Contact Our Sourcing Specialists</p>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Whether you are looking to import a specific model or need assistance navigating Ethiopian import duty regulations, our expert concierge is at your service.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-neutral-900 border border-neutral-800">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400">Main Office & Showroom</div>
                  <div className="text-sm font-bold text-white">Bole Road, Near Olympia, Addis Ababa, Ethiopia</div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-neutral-900 border border-neutral-800">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400">Direct Telephone</div>
                  <div className="text-sm font-bold text-white">+251 (0) 11 690 8888 / +251 91 100 9999</div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-neutral-900 border border-neutral-800">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400">Concierge Email</div>
                  <div className="text-sm font-bold text-white">vip@ethiopianengine.com</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-neutral-900 p-8 md:p-10 rounded-3xl border border-neutral-800">
            <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for contacting Ethiopian Engine Concierge. One of our Senior Advisors will reach out shortly.'); }} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-400 mb-2">Full Name</label>
                  <input type="text" required placeholder="Abebe Bikila" className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-400 mb-2">Phone Number</label>
                  <input type="tel" required placeholder="+251 9..." className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500 transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-neutral-400 mb-2">Email Address</label>
                <input type="email" required placeholder="name@domain.com" className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500 transition-all" />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-neutral-400 mb-2">Desired Automobile Model / Specs</label>
                <textarea rows="4" placeholder="Specify vehicle make, year, color preferences, or duty exemption status..." className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500 transition-all" />
              </div>

              <button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold py-4 rounded-xl transition-all shadow-xl shadow-amber-500/20 text-sm uppercase tracking-wider">
                Submit Confidential Inquiry
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-neutral-950 border-t border-neutral-800 py-12 text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Car className="w-4 h-4" />
            </div>
            <span className="text-white font-serif text-sm font-bold">ETHIOPIAN ENGINE</span>
          </div>

          <p className="text-center md:text-left">
            © {new Date().getFullYear()} Ethiopian Engine Import House. All rights reserved. Registered Automobile Importer in Ethiopia.
          </p>

          <div className="flex gap-6 text-neutral-400">
            <a href="#" className="hover:text-amber-400">Terms of Service</a>
            <a href="#" className="hover:text-amber-400">Privacy Policy</a>
            <a href="#" className="hover:text-amber-400">Customs Guide</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
