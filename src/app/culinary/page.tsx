"use client";
import React, { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import {
  Star,
  Clock,
  Users,
  Award,
  Play,
  Calendar,
  ArrowRight,
  ArrowDown,
  Camera,
  BookOpen,
  Trophy,
  Timer,
  CreditCard,
  X,
  Mail,
  Check,
  Pause,
  Gift,
  Shield,
  MessageCircle,
  Video,
  Utensils,
  GraduationCap,
  Home,
} from "lucide-react";

interface CulinaryClass {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  duration: string;
  price: number;
  originalPrice: number;
  earlyBirdPrice: number;
  heroImage: string;
  videoThumbnail: string;
  instructor: {
    name: string;
    title: string;
    image: string;
    bio: string;
    experience: string;
    specialties: string[];
    awards: string[];
  };
  level: "Beginner" | "Intermediate" | "Advanced";
  maxStudents: number;
  currentStudents: number;
  dishes: {
    name: string;
    image: string;
    difficulty: string;
    description: string;
  }[];
  schedule: {
    startDate: string;
    endDate: string;
    sessions: string[];
    time: string;
    location: string;
  };
  included: {
    icon: React.ElementType;
    title: string;
    description: string;
    highlight?: boolean;
  }[];
  reviews: {
    name: string;
    image: string;
    rating: number;
    review: string;
    date: string;
  }[];
  gallery: string[];
  highlights: string[];
}

const masterClass: CulinaryClass = {
  id: "master-nigerian-cuisine",
  title: "Master Nigerian Cuisine",
  subtitle: "From Traditional Roots to Modern Excellence",
  description:
    "Transform your culinary skills with authentic Nigerian techniques and flavors in our exclusive 6-week masterclass.",
  longDescription:
    "Join Chef Favvy in an immersive culinary journey that combines traditional Nigerian cooking methods with modern techniques. This intensive program is designed for passionate home cooks who want to master the art of Nigerian cuisine.",
  duration: "6 weeks",
  price: 200000,
  originalPrice: 250000,
  earlyBirdPrice: 150000,
  heroImage:
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
  videoThumbnail:
    "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  instructor: {
    name: "Chef Favvy Dike",
    title: "Master Chef & Cultural Curator",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    bio: "With over 15 years of culinary expertise spanning from Lagos to London, Chef Favvy has dedicated her career to preserving and elevating Nigerian cuisine. Featured in Bon Appétit and winner of the African Culinary Excellence Award.",
    experience: "15+ years",
    specialties: [
      "Nigerian Traditional Cuisine",
      "Modern African Fusion",
      "Spice Blending",
      "Cultural Food History",
    ],
    awards: [
      "African Culinary Excellence Award 2023",
      "Featured in Bon Appétit Magazine",
      "Lagos Food Festival Champion",
    ],
  },
  level: "Beginner",
  maxStudents: 16,
  currentStudents: 12,
  dishes: [
    {
      name: "Perfect Jollof Rice",
      image:
        "https://images.unsplash.com/photo-1604329760661-e71dc83f8d26?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      difficulty: "Intermediate",
      description:
        "Master the art of creating the perfect party jollof with smoky undertones and perfectly balanced spices",
    },
    {
      name: "Authentic Pepper Soup",
      image:
        "https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      difficulty: "Beginner",
      description:
        "Learn the secrets of traditional pepper soup with native spices and medicinal herbs",
    },
    {
      name: "Restaurant-Style Suya",
      image:
        "https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      difficulty: "Intermediate",
      description:
        "Create the perfect suya spice blend and grilling techniques for tender, flavorful meat",
    },
    {
      name: "Egusi Soup Mastery",
      image:
        "https://images.unsplash.com/photo-1604329760661-e71dc83f8d26?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      difficulty: "Advanced",
      description:
        "Perfect the technique for smooth, rich egusi with properly balanced proteins and vegetables",
    },
    {
      name: "Fluffy Pounded Yam",
      image:
        "https://images.unsplash.com/photo-1596040033229-a29b084898ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      difficulty: "Beginner",
      description:
        "Master the traditional technique for smooth, stretchy pounded yam",
    },
    {
      name: "Crispy Plantain Perfection",
      image:
        "https://images.unsplash.com/photo-1596040033229-a29b084898ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      difficulty: "Beginner",
      description: "Learn various plantain preparations from sweet to savory",
    },
  ],
  schedule: {
    startDate: "March 15, 2024",
    endDate: "April 26, 2024",
    sessions: [
      "Week 1: Foundations & Rice",
      "Week 2: Soups & Stews",
      "Week 3: Proteins & Grilling",
      "Week 4: Sides & Vegetables",
      "Week 5: Advanced Techniques",
      "Week 6: Menu Planning & Presentation",
    ],
    time: "Saturdays, 10:00 AM - 3:00 PM",
    location: "Food Palace Culinary School, SARS Road Port Harcourt",
  },
  included: [
    {
      icon: Clock,
      title: "30 Hours of Hands-On Training",
      description:
        "6 intensive sessions with personalized attention from Chef Favvy",
      highlight: true,
    },
    {
      icon: Utensils,
      title: "All Ingredients & Equipment",
      description:
        "Premium ingredients and professional tools provided for every session",
    },
    {
      icon: BookOpen,
      title: "Digital Recipe Collection",
      description:
        "30+ authentic recipes with step-by-step instructions and video guides",
    },
    {
      icon: Gift,
      title: "Take-Home Spice Kit",
      description:
        "Curated selection of traditional Nigerian spices and seasonings",
    },
    {
      icon: GraduationCap,
      title: "Certificate of Mastery",
      description:
        "Official completion certificate recognized by culinary institutions",
    },
    {
      icon: MessageCircle,
      title: "Private WhatsApp Community",
      description:
        "Lifetime access to exclusive community with fellow students and Chef Favvy",
    },
    {
      icon: Video,
      title: "Recipe Video Library",
      description: "Access to recorded sessions and technique demonstrations",
    },
    {
      icon: Mail,
      title: "Lifetime Email Support",
      description:
        "Get answers to your cooking questions directly from Chef Favvy",
    },
    {
      icon: Trophy,
      title: "20% Off Future Classes",
      description:
        "Exclusive discount on all upcoming masterclasses and workshops",
    },
  ],
  reviews: [
    {
      name: "Kemi Adebayo",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b332b02e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      rating: 5,
      review:
        "Chef Favvy transformed my cooking completely! I went from burning water to hosting dinner parties. The techniques I learned here are invaluable.",
      date: "2 weeks ago",
    },
    {
      name: "David Okonkwo",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      rating: 5,
      review:
        "As someone who grew up abroad, this class reconnected me with my roots. Chef Favvy doesn't just teach recipes; she shares culture.",
      date: "1 month ago",
    },
    {
      name: "Sarah Johnson",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      rating: 5,
      review:
        "The best investment I've made! The small class size meant personalized attention, and Chef Favvy's passion is infectious.",
      date: "3 weeks ago",
    },
  ],
  gallery: [
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1556910633-5099dc3971e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1556909045-f23aa42d1148?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  ],
  highlights: [
    "Only 4 spots left at early bird price!",
    "Small class size for personalized attention",
    "All ingredients & equipment included",
    "Take-home recipe collection & spice kit",
  ],
};

const CulinaryMasterclass: React.FC = () => {
  const [showEnrollment, setShowEnrollment] = useState(false);
  const [showBookVisit, setShowBookVisit] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [selectedDish, setSelectedDish] = useState<
    (typeof masterClass.dishes)[0] | null
  >(null);
  const [enrollmentStep, setEnrollmentStep] = useState(1);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [enrollmentData, setEnrollmentData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    paymentMethod: "paystack",
    enrollmentType: "immediate", // 'immediate' or 'visit'
  });
  const [visitData, setVisitData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });

  const { scrollY } = useScroll();
  const heroRef = useRef<HTMLDivElement>(null);
  const dishesRef = useRef<HTMLDivElement>(null);
  const instructorRef = useRef<HTMLDivElement>(null);
  const includedRef = useRef<HTMLDivElement>(null);

  const heroY = useTransform(scrollY, [0, 500], [0, 100]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.9]);

  const dishesInView = useInView(dishesRef, { once: true, margin: "-50px" });
  const instructorInView = useInView(instructorRef, {
    once: true,
    margin: "-50px",
  });
  const includedInView = useInView(includedRef, {
    once: true,
    margin: "-50px",
  });

  // Smooth scroll functionality
  const scrollToSection = (
    elementRef: React.RefObject<HTMLDivElement | null>
  ) => {
    elementRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Handle enrollment form
  const handleEnrollmentSubmit = () => {
    if (enrollmentStep < 3) {
      setEnrollmentStep(enrollmentStep + 1);
    } else {
      // Process enrollment
      alert(
        "Enrollment completed! You'll receive a confirmation email shortly."
      );
      setShowEnrollment(false);
      setEnrollmentStep(1);
      setEnrollmentData({
        name: "",
        email: "",
        phone: "",
        experience: "",
        paymentMethod: "paystack",
        enrollmentType: "immediate",
      });
    }
  };

  // Handle visit booking
  const handleVisitSubmit = () => {
    alert(
      "Visit request submitted! We'll contact you within 24 hours to confirm your appointment."
    );
    setShowBookVisit(false);
    setVisitData({
      name: "",
      email: "",
      phone: "",
      preferredDate: "",
      preferredTime: "",
      message: "",
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-[family-name:var(--font-urbanist)]">
      {/* Ultra Premium Hero Section */}
      <section
        ref={heroRef}
        className="relative h-screen overflow-hidden bg-black"
      >
        {/* Background Image with Subtle Parallax */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${masterClass.heroImage})` }}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
        </motion.div>

        {/* Navigation */}
        <nav className="relative z-50 flex justify-between items-center px-6 md:px-12 py-8">
          <motion.div
            className="text-xl md:text-2xl font-light text-white tracking-wide"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Food Palace Culinary School
          </motion.div>

          <motion.div
            className="flex items-center gap-2 text-xs md:text-sm text-amber-400 font-medium"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            LIMITED ENROLLMENT
          </motion.div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-40 flex items-center justify-center h-full px-6 md:px-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* Left Content - 7 columns */}
            <motion.div
              className="lg:col-span-7 text-white space-y-8 md:space-y-12"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              {/* Status Badge */}
              <motion.div
                className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                  <span className="text-amber-400 text-sm font-medium tracking-wide">
                    EARLY BIRD SPECIAL
                  </span>
                </div>
                <div className="text-red-400 text-sm font-medium">
                  Only {masterClass.maxStudents - masterClass.currentStudents}{" "}
                  spots remaining
                </div>
              </motion.div>

              {/* Main Title */}
              <div className="space-y-4 md:space-y-6">
                <motion.h1
                  className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-light leading-[0.9] tracking-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  Master
                  <br />
                  <span className="font-normal">Nigerian</span>
                  <br />
                  <span className="text-amber-400 font-light italic">
                    Cuisine
                  </span>
                </motion.h1>

                <motion.p
                  className="text-lg md:text-xl text-white/80 max-w-lg leading-relaxed font-light"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  {masterClass.description}
                </motion.p>
              </div>

              {/* Key Features */}
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
              >
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-light text-amber-400">
                    {masterClass.duration}
                  </div>
                  <div className="text-xs md:text-sm text-white/60">
                    Intensive Training
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-light text-amber-400">
                    {masterClass.dishes.length}
                  </div>
                  <div className="text-xs md:text-sm text-white/60">
                    Signature Dishes
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-light text-amber-400">
                    {masterClass.maxStudents}
                  </div>
                  <div className="text-xs md:text-sm text-white/60">
                    Max Students
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-light text-amber-400">
                    5.0
                  </div>
                  <div className="text-xs md:text-sm text-white/60">
                    Student Rating
                  </div>
                </div>
              </motion.div>

              {/* Price & CTA */}
              <motion.div
                className="space-y-6 md:space-y-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
              >
                <div className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-6">
                  <div className="text-4xl md:text-5xl font-light text-white">
                    ₦{masterClass.earlyBirdPrice.toLocaleString()}
                  </div>
                  <div className="text-xl md:text-2xl text-white/40 line-through font-light">
                    ₦{masterClass.originalPrice.toLocaleString()}
                  </div>
                  <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Save ₦
                    {(
                      masterClass.originalPrice - masterClass.earlyBirdPrice
                    ).toLocaleString()}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                  <button
                    onClick={() => setShowEnrollment(true)}
                    className="group cursor-pointer px-6 md:px-8 py-3 md:py-4 bg-white text-black hover:bg-amber-400 hover:text-black transition-all duration-300 rounded-full font-medium flex items-center gap-3 w-full sm:w-auto justify-center"
                  >
                    Enroll Now
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>

                  <button
                    onClick={() => setShowBookVisit(true)}
                    className="group flex items-center gap-3 text-white/80 hover:text-white transition-colors duration-300 w-full sm:w-auto justify-center sm:justify-start"
                  >
                    <div className="w-10 cursor-pointer md:w-12 h-10 md:h-12 rounded-full border border-white/40 group-hover:border-white flex items-center justify-center transition-colors duration-300">
                      <Calendar className="w-4 md:w-5 h-4 md:h-5" />
                    </div>
                    <span className="font-light">Book a Visit</span>
                  </button>

                  <button
                    onClick={() => setShowVideo(true)}
                    className="group flex items-center gap-3 text-white/80 hover:text-white transition-colors duration-300 w-full sm:w-auto justify-center sm:justify-start"
                  >
                    <div className="w-10 md:w-12 h-10 md:h-12 rounded-full border border-white/40 group-hover:border-white flex items-center justify-center transition-colors duration-300">
                      <Play className="w-4 md:w-5 h-4 md:h-5 ml-1" />
                    </div>
                    <span className="font-light">Watch Preview</span>
                  </button>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Info Card - 5 columns */}
            <motion.div
              className="lg:col-span-5 order-first lg:order-last"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 space-y-6 md:space-y-8">
                {/* Instructor */}
                <div className="flex items-center gap-4">
                  <img
                    src={masterClass.instructor.image}
                    alt={masterClass.instructor.name}
                    className="w-12 md:w-16 h-12 md:h-16 rounded-full"
                  />
                  <div>
                    <h3 className="text-lg font-medium text-white">
                      {masterClass.instructor.name}
                    </h3>
                    <p className="text-white/60 text-sm">
                      {masterClass.instructor.title}
                    </p>
                  </div>
                </div>

                {/* Limited Time Banner */}
                <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30 rounded-2xl p-4 text-center">
                  <div className="text-red-400 font-medium text-sm mb-1">
                    ⏰ LIMITED TIME OFFER
                  </div>
                  <div className="text-white text-lg font-light">
                    Small Class • Personal Attention
                  </div>
                  <div className="text-white/60 text-sm">
                    Certificate of Mastery Included
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center justify-center gap-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-amber-400 fill-current"
                      />
                    ))}
                  </div>
                  <span className="text-white/60 text-sm">
                    ({masterClass.reviews.length} reviews)
                  </span>
                </div>

                {/* Quick highlights */}
                <div className="space-y-3">
                  {[
                    "30 hours of hands-on training",
                    "All ingredients & equipment included",
                    "Take-home spice kit & recipes",
                    "Lifetime community access",
                  ].map((highlight, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-green-400" />
                      <span className="text-white/80 text-sm">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.button
          onClick={() => scrollToSection(includedRef)}
          className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 hover:text-white transition-colors duration-300 flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs uppercase tracking-wider font-light">
            What&apos;s included
          </span>
          <ArrowDown className="w-5 h-5" />
        </motion.button>
      </section>

      {/* What's Included Section - Enhanced */}
      <section
        ref={includedRef}
        className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            className="text-center mb-16 md:mb-20"
            variants={containerVariants}
            initial="hidden"
            animate={includedInView ? "visible" : "hidden"}
          >
            <motion.div
              className="w-16 h-px bg-amber-400 mx-auto mb-8"
              variants={itemVariants}
            />
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6 tracking-tight"
              variants={itemVariants}
            >
              Everything <span className="italic text-amber-600">Included</span>
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed"
              variants={itemVariants}
            >
              Your complete culinary transformation package - no hidden costs,
              no surprises
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={includedInView ? "visible" : "hidden"}
          >
            {masterClass.included.map((item, index) => (
              <motion.div
                key={index}
                className={`group relative p-6 md:p-8 rounded-2xl transition-all duration-300 ${
                  item.highlight
                    ? "bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 hover:border-amber-300"
                    : "bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg"
                }`}
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                {item.highlight && (
                  <div className="absolute -top-3 left-6 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    FEATURED
                  </div>
                )}

                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${
                    item.highlight
                      ? "bg-amber-500 text-white"
                      : "bg-gray-100 text-gray-600 group-hover:bg-amber-100 group-hover:text-amber-600"
                  } transition-colors duration-300`}
                >
                  <item.icon className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-medium text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed font-light">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Summary Card */}
          <motion.div
            className="mt-16 md:mt-20 max-w-4xl mx-auto bg-black rounded-3xl p-8 md:p-12 text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={
              includedInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{ delay: 0.8 }}
          >
            <div className="text-center space-y-6">
              <h3 className="text-3xl md:text-4xl font-light">
                Complete Package Value
              </h3>
              <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8">
                <div className="text-center">
                  <div className="text-2xl text-gray-400 line-through">
                    ₦{masterClass.originalPrice.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">Regular Price</div>
                </div>
                <div className="text-6xl md:text-7xl font-light text-amber-400">
                  ₦{masterClass.earlyBirdPrice.toLocaleString()}
                </div>
                <div className="text-center">
                  <div className="text-2xl text-green-400">
                    ₦
                    {(
                      masterClass.originalPrice - masterClass.earlyBirdPrice
                    ).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">You Save</div>
                </div>
              </div>
              <p className="text-white/80 max-w-2xl mx-auto leading-relaxed">
                Early bird pricing ends soon. Secure your spot in Nigeria&apos;s
                most comprehensive culinary masterclass.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Signature Dishes - Enhanced */}
      <section ref={dishesRef} className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            className="text-center mb-16 md:mb-20"
            variants={containerVariants}
            initial="hidden"
            animate={dishesInView ? "visible" : "hidden"}
          >
            <motion.div
              className="w-16 h-px bg-amber-400 mx-auto mb-8"
              variants={itemVariants}
            />
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6 tracking-tight"
              variants={itemVariants}
            >
              Master These{" "}
              <span className="italic text-amber-600">Classics</span>
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed"
              variants={itemVariants}
            >
              From foundational techniques to restaurant-quality presentation,
              perfect these iconic Nigerian dishes
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
            variants={containerVariants}
            initial="hidden"
            animate={dishesInView ? "visible" : "hidden"}
          >
            {masterClass.dishes.map((dish) => (
              <motion.div
                key={dish.name}
                className="group cursor-pointer"
                variants={itemVariants}
                onClick={() => setSelectedDish(dish)}
              >
                <div className="space-y-6">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />

                    {/* Difficulty Badge */}
                    <div
                      className={`absolute top-4 md:top-6 left-4 md:left-6 px-3 py-1 rounded-full text-white text-xs font-medium ${
                        dish.difficulty === "Beginner"
                          ? "bg-green-500/90"
                          : dish.difficulty === "Intermediate"
                          ? "bg-amber-500/90"
                          : "bg-red-500/90"
                      }`}
                    >
                      {dish.difficulty}
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/20 backdrop-blur-md rounded-full p-4">
                        <Camera className="w-6 md:w-8 h-6 md:h-8 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl md:text-2xl font-light text-gray-900 group-hover:text-amber-600 transition-colors duration-300">
                      {dish.name}
                    </h3>
                    <p className="text-gray-600 leading-relaxed font-light text-sm md:text-base">
                      {dish.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Meet Your Instructor - Enhanced */}
      <section ref={instructorRef} className="py-20 md:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
            variants={containerVariants}
            initial="hidden"
            animate={instructorInView ? "visible" : "hidden"}
          >
            {/* Image - 5 columns */}
            <motion.div className="lg:col-span-5" variants={itemVariants}>
              <div className="relative">
                <img
                  src={masterClass.instructor.image}
                  alt={masterClass.instructor.name}
                  className="w-full aspect-[4/5] object-cover rounded-2xl"
                />

                {/* Floating Achievement */}
                <div className="absolute -bottom-4 md:-bottom-6 -right-4 md:-right-6 bg-white rounded-2xl p-4 md:p-6 shadow-2xl">
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-light text-amber-600">
                      {masterClass.instructor.experience}
                    </div>
                    <div className="text-gray-600 text-sm font-medium">
                      Experience
                    </div>
                  </div>
                </div>

                <div className="absolute -top-4 md:-top-6 -left-4 md:-left-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl p-4 md:p-6 shadow-2xl">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 md:w-6 h-5 md:h-6" />
                    <div>
                      <div className="font-bold text-sm md:text-base">
                        Award Winner
                      </div>
                      <div className="text-xs md:text-sm opacity-90">
                        2023 Excellence
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content - 7 columns */}
            <motion.div
              className="lg:col-span-7 space-y-6 md:space-y-8"
              variants={itemVariants}
            >
              <div className="space-y-4 md:space-y-6">
                <div className="w-16 h-px bg-amber-400" />
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 tracking-tight">
                  Meet Your <span className="italic text-amber-600">Chef</span>
                </h2>
                <div className="space-y-2">
                  <div className="text-xl md:text-2xl font-light text-amber-600">
                    {masterClass.instructor.name}
                  </div>
                  <div className="text-lg text-gray-600 font-light">
                    {masterClass.instructor.title}
                  </div>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed font-light max-w-2xl">
                  {masterClass.instructor.bio}
                </p>
              </div>

              {/* Specialties & Awards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Specialties
                  </h3>
                  <div className="space-y-3">
                    {masterClass.instructor.specialties.map(
                      (specialty, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                          <span className="text-gray-700 font-light">
                            {specialty}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Recognition
                  </h3>
                  <div className="space-y-3">
                    {masterClass.instructor.awards.map((award, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Award className="w-4 h-4 text-amber-500 mt-1" />
                        <span className="text-gray-700 font-light text-sm">
                          {award}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Student Reviews */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16 md:mb-20">
            <div className="w-16 h-px bg-amber-400 mx-auto mb-8" />
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6 tracking-tight">
              Student <span className="italic text-amber-600">Success</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
              Real transformations from real students
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {masterClass.reviews.map((review, index) => (
              <motion.div
                key={review.name}
                className="space-y-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="flex gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-amber-400 fill-current"
                    />
                  ))}
                </div>

                <blockquote className="text-lg text-gray-700 leading-relaxed font-light italic">
                  &quot;{review.review}&quot;
                </blockquote>

                <div className="flex items-center gap-4">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="font-medium text-gray-900">
                      {review.name}
                    </div>
                    <div className="text-sm text-gray-500">{review.date}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Enhanced */}
      <section className="py-20 md:py-32 bg-black text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-8 md:grid-cols-12 gap-4 h-full">
            {[...Array(48)].map((_, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-full"
                animate={{ scale: [0.5, 1, 0.5], opacity: [0.3, 0.7, 0.3] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center px-6 md:px-12 relative z-10 space-y-8 md:space-y-12">
          <div className="space-y-6 md:space-y-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight">
              Transform Your{" "}
              <span className="italic text-amber-400">Culinary Skills</span>
            </h2>

            <p className="text-xl text-white/80 font-light leading-relaxed max-w-2xl mx-auto">
              Join Nigeria&apos;s most exclusive culinary masterclass. Only{" "}
              {masterClass.maxStudents - masterClass.currentStudents} spots
              remaining.
            </p>
          </div>

          <div className="space-y-4 md:space-y-6">
            <div className="text-5xl md:text-6xl font-light">
              ₦{masterClass.earlyBirdPrice.toLocaleString()}
            </div>
            <div className="text-white/60">
              Early bird special • Limited time • Certificate included
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <button
              onClick={() => setShowEnrollment(true)}
              className="px-8 md:px-12 py-4 md:py-6 bg-white text-black hover:bg-amber-400 transition-colors duration-300 rounded-full font-medium text-lg w-full sm:w-auto"
            >
              Secure Your Spot
            </button>

            <button
              onClick={() => setShowBookVisit(true)}
              className="px-8 md:px-12 py-4 md:py-6 border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 rounded-full font-medium text-lg w-full sm:w-auto"
            >
              Book a Visit First
            </button>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 pt-6 md:pt-8 text-sm">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>Small Class Size</span>
            </div>
            <div className="flex items-center gap-2">
              <Timer className="w-5 h-5" />
              <span>Starts March 15</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              <span>Certificate Included</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span>30-Day Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Enrollment Modal */}
      <AnimatePresence>
        {showEnrollment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowEnrollment(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 md:p-8 space-y-6 md:space-y-8">
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-light text-gray-900">
                      Enroll in Masterclass
                    </h3>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-gray-600">
                        Step {enrollmentStep} of 3
                      </span>
                      <div className="flex gap-2">
                        {[1, 2, 3].map((step) => (
                          <div
                            key={step}
                            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                              step <= enrollmentStep
                                ? "bg-amber-400"
                                : "bg-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowEnrollment(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-amber-400 to-orange-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(enrollmentStep / 3) * 100}%` }}
                  />
                </div>

                {/* Step 1: Personal Information */}
                {enrollmentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
                      <h4 className="text-xl font-medium mb-2">
                        Personal Information
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Tell us about yourself so we can personalize your
                        learning experience
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={enrollmentData.name}
                          onChange={(e) =>
                            setEnrollmentData({
                              ...enrollmentData,
                              name: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={enrollmentData.email}
                          onChange={(e) =>
                            setEnrollmentData({
                              ...enrollmentData,
                              email: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          value={enrollmentData.phone}
                          onChange={(e) =>
                            setEnrollmentData({
                              ...enrollmentData,
                              phone: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
                          placeholder="+234 xxx xxx xxxx"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Cooking Experience *
                        </label>
                        <select
                          value={enrollmentData.experience}
                          onChange={(e) =>
                            setEnrollmentData({
                              ...enrollmentData,
                              experience: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
                          required
                        >
                          <option value="">Select your level</option>
                          <option value="beginner">Complete Beginner</option>
                          <option value="some">Some Experience</option>
                          <option value="intermediate">Home Cook</option>
                          <option value="advanced">Experienced Cook</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Class Summary */}
                {enrollmentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
                      <h4 className="text-xl font-medium mb-2">
                        Class Summary
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Review your masterclass details and what you&apos;ll
                        receive
                      </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-6">
                      <div className="flex items-start gap-4">
                        <img
                          src={masterClass.instructor.image}
                          alt={masterClass.instructor.name}
                          className="w-16 h-16 rounded-full"
                        />
                        <div className="flex-1">
                          <h5 className="font-medium text-lg">
                            {masterClass.title}
                          </h5>
                          <p className="text-gray-600">
                            with {masterClass.instructor.name}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {masterClass.schedule.time}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
                        <div className="text-center">
                          <div className="font-medium text-amber-600">
                            {masterClass.duration}
                          </div>
                          <div className="text-sm text-gray-500">Duration</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-amber-600">
                            {masterClass.dishes.length}
                          </div>
                          <div className="text-sm text-gray-500">Dishes</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-amber-600">
                            {masterClass.maxStudents}
                          </div>
                          <div className="text-sm text-gray-500">
                            Max Students
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-amber-600">
                            {masterClass.maxStudents -
                              masterClass.currentStudents}
                          </div>
                          <div className="text-sm text-gray-500">
                            Spots Left
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-center space-y-4 bg-gray-50 rounded-2xl p-6">
                      <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                        <div className="text-center">
                          <div className="text-2xl text-gray-400 line-through">
                            ₦{masterClass.originalPrice.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-500">
                            Regular Price
                          </div>
                        </div>
                        <ArrowRight className="w-6 h-6 text-gray-400 hidden md:block" />
                        <div className="text-center">
                          <div className="text-4xl font-light text-green-600">
                            ₦{masterClass.earlyBirdPrice.toLocaleString()}
                          </div>
                          <div className="text-sm text-green-600 font-medium">
                            Early Bird Price
                          </div>
                        </div>
                      </div>
                      <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full inline-block text-sm font-medium">
                        You save ₦
                        {(
                          masterClass.originalPrice - masterClass.earlyBirdPrice
                        ).toLocaleString()}
                        !
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Payment */}
                {enrollmentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
                      <h4 className="text-xl font-medium mb-2">
                        Complete Your Enrollment
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Choose your preferred payment method to secure your spot
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button
                        onClick={() =>
                          setEnrollmentData({
                            ...enrollmentData,
                            paymentMethod: "paystack",
                          })
                        }
                        className={`p-6 border-2 rounded-2xl transition-all duration-300 ${
                          enrollmentData.paymentMethod === "paystack"
                            ? "border-green-500 bg-green-50 shadow-lg"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center justify-center gap-3 mb-3">
                          <CreditCard className="w-8 h-8 text-green-500" />
                          <span className="font-medium text-lg">Paystack</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Secure payment with cards, bank transfer & more
                        </p>
                      </button>
                      <button
                        onClick={() =>
                          setEnrollmentData({
                            ...enrollmentData,
                            paymentMethod: "flutterwave",
                          })
                        }
                        className={`p-6 border-2 rounded-2xl transition-all duration-300 ${
                          enrollmentData.paymentMethod === "flutterwave"
                            ? "border-orange-500 bg-orange-50 shadow-lg"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center justify-center gap-3 mb-3">
                          <CreditCard className="w-8 h-8 text-orange-500" />
                          <span className="font-medium text-lg">
                            Flutterwave
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Pay with cards, mobile money & bank transfers
                        </p>
                      </button>
                    </div>

                    <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
                      <h5 className="font-medium mb-4 flex items-center gap-2">
                        <Gift className="w-5 h-5 text-amber-600" />
                        What&apos;s Included in Your Package:
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {masterClass.included.slice(0, 6).map((item, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                            <span className="text-sm text-gray-700">
                              {item.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Shield className="w-6 h-6 text-blue-500" />
                        <h5 className="font-medium">
                          30-Day Money-Back Guarantee
                        </h5>
                      </div>
                      <p className="text-sm text-gray-600">
                        If you&apos;re not completely satisfied with your
                        masterclass experience within the first 30 days,
                        we&apos;ll provide a full refund. No questions asked.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6 border-t border-gray-200">
                  {enrollmentStep > 1 && (
                    <button
                      onClick={() => setEnrollmentStep(enrollmentStep - 1)}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2"
                    >
                      <ArrowRight className="w-4 h-4 rotate-180" />
                      Back
                    </button>
                  )}
                  <button
                    onClick={handleEnrollmentSubmit}
                    disabled={
                      (enrollmentStep === 1 &&
                        (!enrollmentData.name ||
                          !enrollmentData.email ||
                          !enrollmentData.phone ||
                          !enrollmentData.experience)) ||
                      (enrollmentStep === 3 && !enrollmentData.paymentMethod)
                    }
                    className="ml-auto px-8 py-3 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white rounded-full font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {enrollmentStep === 3 ? (
                      <>
                        <CreditCard className="w-4 h-4" />
                        Complete Enrollment - ₦
                        {masterClass.earlyBirdPrice.toLocaleString()}
                      </>
                    ) : (
                      <>
                        Continue
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Book a Visit Modal */}
      <AnimatePresence>
        {showBookVisit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowBookVisit(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 md:p-8 space-y-6 md:space-y-8">
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-light text-gray-900">
                      Book a Studio Visit
                    </h3>
                    <p className="text-gray-600 mt-2">
                      Experience our culinary studio and meet Chef Favvy before
                      enrolling
                    </p>
                  </div>
                  <button
                    onClick={() => setShowBookVisit(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center">
                      <Home className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-lg mb-2">
                        What to Expect
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Tour our state-of-the-art culinary studio</li>
                        <li>• Meet Chef Favvy and ask questions</li>
                        <li>• See our equipment and ingredients firsthand</li>
                        <li>• Watch a live cooking demonstration</li>
                        <li>• Get personalized course recommendations</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={visitData.name}
                      onChange={(e) =>
                        setVisitData({ ...visitData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={visitData.email}
                      onChange={(e) =>
                        setVisitData({ ...visitData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={visitData.phone}
                      onChange={(e) =>
                        setVisitData({ ...visitData, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="+234 xxx xxx xxxx"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      value={visitData.preferredDate}
                      onChange={(e) =>
                        setVisitData({
                          ...visitData,
                          preferredDate: e.target.value,
                        })
                      }
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
                      required
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Preferred Time
                    </label>
                    <select
                      value={visitData.preferredTime}
                      onChange={(e) =>
                        setVisitData({
                          ...visitData,
                          preferredTime: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
                    >
                      <option value="">Select preferred time</option>
                      <option value="morning">
                        Morning (10:00 AM - 12:00 PM)
                      </option>
                      <option value="afternoon">
                        Afternoon (2:00 PM - 4:00 PM)
                      </option>
                      <option value="evening">
                        Evening (5:00 PM - 7:00 PM)
                      </option>
                    </select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Message (Optional)
                    </label>
                    <textarea
                      value={visitData.message}
                      onChange={(e) =>
                        setVisitData({ ...visitData, message: e.target.value })
                      }
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                      placeholder="Any specific questions or areas of interest?"
                    />
                  </div>
                </div>

                <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
                  <h5 className="font-medium mb-2 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-amber-600" />
                    Visit Details:
                  </h5>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>
                      <strong>Duration:</strong> 45-60 minutes
                    </p>
                    <p>
                      <strong>Location:</strong> Road 4, Royal Estate, Port
                      Harcourt
                    </p>
                    <p>
                      <strong>What to bring:</strong> Just yourself and your
                      curiosity!
                    </p>
                    <p>
                      <strong>Cost:</strong> Completely free, no obligation
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleVisitSubmit}
                  disabled={
                    !visitData.name ||
                    !visitData.email ||
                    !visitData.phone ||
                    !visitData.preferredDate
                  }
                  className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-full font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  Schedule My Visit
                </button>

                <p className="text-center text-sm text-gray-500">
                  We&apos;ll contact you within 24 hours to confirm your
                  appointment
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setShowVideo(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full aspect-video bg-black rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowVideo(false)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Video Placeholder */}
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <button
                    onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                    className="w-20 h-20 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors duration-300"
                  >
                    {isVideoPlaying ? (
                      <Pause className="w-8 h-8 text-white" />
                    ) : (
                      <Play className="w-8 h-8 text-white ml-1" />
                    )}
                  </button>
                  <div className="text-white">
                    <h3 className="text-2xl font-light mb-2">
                      Masterclass Preview
                    </h3>
                    <p className="text-white/80">
                      Get a glimpse into our exclusive culinary program
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dish Detail Modal */}
      <AnimatePresence>
        {selectedDish && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedDish(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video">
                <img
                  src={selectedDish.image}
                  alt={selectedDish.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedDish(null)}
                  className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white rounded-full transition-colors duration-200"
                >
                  <X className="w-6 h-6" />
                </button>
                <div
                  className={`absolute top-4 left-4 px-3 py-1 rounded-full text-white text-sm font-medium ${
                    selectedDish.difficulty === "Beginner"
                      ? "bg-green-500"
                      : selectedDish.difficulty === "Intermediate"
                      ? "bg-amber-500"
                      : "bg-red-500"
                  }`}
                >
                  {selectedDish.difficulty}
                </div>
              </div>

              <div className="p-6 md:p-8 space-y-6">
                <div className="space-y-3">
                  <h3 className="text-2xl md:text-3xl font-light text-gray-900">
                    {selectedDish.name}
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed font-light">
                    {selectedDish.description}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => {
                      setSelectedDish(null);
                      setShowEnrollment(true);
                    }}
                    className="flex-1 py-3 bg-amber-400 hover:bg-amber-500 text-black rounded-full font-medium transition-colors duration-200"
                  >
                    Enroll to Master This Dish
                  </button>
                  <button
                    onClick={() => {
                      setSelectedDish(null);
                      setShowBookVisit(true);
                    }}
                    className="flex-1 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-full font-medium transition-colors duration-200"
                  >
                    Book a Visit First
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CulinaryMasterclass;
