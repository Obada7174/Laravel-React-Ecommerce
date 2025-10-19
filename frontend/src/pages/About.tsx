import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Target,
  Eye,
  Heart,
  Users,
  TrendingUp,
  Award,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20 md:py-32">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25" />

        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl text-center"
          >
            <Badge className="mb-4 bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20">
              <Sparkles className="mr-1 h-3 w-3" />
              About Meridian
            </Badge>

            <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
              Redefining Online Shopping
            </h1>

            <p className="mb-8 text-lg text-muted-foreground md:text-xl max-w-3xl mx-auto leading-relaxed">
              At Meridian, we believe shopping should be an experience, not just a transaction.
              We're on a mission to bring you quality products, exceptional service, and unbeatable value.
            </p>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20">
                Our Story
              </Badge>
              <h2 className="text-4xl font-bold mb-6">Built on Passion and Purpose</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                Founded with a simple yet powerful vision: to create an online marketplace where quality meets
                affordability, and customer satisfaction is paramount. What started as a small venture has grown
                into a thriving community of happy shoppers.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Every product we offer is carefully curated to ensure it meets our high standards. We work directly
                with trusted suppliers and brands to bring you authentic products at prices that don't break the bank.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  <span className="text-sm font-medium">Curated Selection</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  <span className="text-sm font-medium">Trusted Quality</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  <span className="text-sm font-medium">Fair Prices</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-amber-500 to-emerald-500 p-1">
                <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80"
                    alt="Our Story"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-4">Our Mission & Vision</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Guiding principles that drive everything we do
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl group">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 inline-block shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Target className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To provide our customers with an exceptional online shopping experience by offering high-quality
                    products, competitive prices, and outstanding customer service. We strive to make shopping easy,
                    enjoyable, and accessible to everyone.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl group">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 inline-block shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Eye className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To become the most trusted and loved online marketplace, where customers find not just products,
                    but value, inspiration, and community. We envision a future where online shopping is sustainable,
                    ethical, and enriching for all.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20">
                Core Values
              </Badge>
              <h2 className="text-4xl font-bold mb-4">What We Stand For</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                The values that shape our culture and guide our decisions
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: 'Customer First',
                description: 'Your satisfaction and trust are at the heart of everything we do. We listen, adapt, and continually improve based on your feedback.',
                gradient: 'from-red-500 to-pink-500'
              },
              {
                icon: Award,
                title: 'Quality Assured',
                description: 'We never compromise on quality. Every product is vetted to ensure it meets our rigorous standards before reaching you.',
                gradient: 'from-amber-500 to-orange-500'
              },
              {
                icon: TrendingUp,
                title: 'Continuous Innovation',
                description: 'We embrace change and innovation, constantly evolving our platform and services to provide you with the best shopping experience.',
                gradient: 'from-emerald-500 to-teal-500'
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
                  <CardContent className="p-8 text-center">
                    <div className="mb-6 flex justify-center">
                      <div className={`p-4 rounded-2xl bg-gradient-to-br ${value.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <value.icon className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                  {/* Decorative gradient - animates from center outward */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-0 bg-gradient-to-r from-amber-500 via-emerald-500 to-amber-500 group-hover:w-full transition-all duration-700 ease-out" />
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-4">Our Impact in Numbers</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Growing together with our amazing community
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '50K+', label: 'Happy Customers', icon: Users },
              { value: '1000+', label: 'Products', icon: ShoppingBag },
              { value: '98%', label: 'Satisfaction Rate', icon: Heart },
              { value: '24/7', label: 'Support', icon: Award }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center hover:shadow-xl transition-all duration-300 group border-2 hover:border-primary/50">
                  <CardContent className="p-6">
                    <div className="mb-4 flex justify-center">
                      <stat.icon className="h-10 w-10 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                      {stat.value}
                    </div>
                    <p className="text-muted-foreground font-medium">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-500 to-emerald-500 dark:from-amber-600 dark:to-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-blob" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ready to Experience the Difference?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join our community and discover why thousands choose Meridian for their shopping needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button size="lg" variant="secondary" className="shadow-xl hover:shadow-2xl transition-shadow group">
                  <ShoppingBag className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                  Start Shopping
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm">
                  Get in Touch
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
