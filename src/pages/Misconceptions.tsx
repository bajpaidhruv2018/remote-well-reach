import { useState } from "react";
import { Card } from "@/components/ui/card";
import { XCircle, CheckCircle, Droplet, ThermometerSun, Syringe, Baby, Hospital } from "lucide-react";

interface Misconception {
  id: number;
  icon: typeof Syringe;
  mythEn: string;
  mythHi: string;
  factEn: string;
  factHi: string;
}

const misconceptions: Misconception[] = [
  {
    id: 1,
    icon: Syringe,
    mythEn: "Vaccines cause illness.",
    mythHi: "टीके लगवाने से बीमारियाँ होती हैं।",
    factEn: "Vaccines protect you and your family from serious diseases.",
    factHi: "टीके आपको और आपके परिवार को गंभीर बीमारियों से बचाते हैं।",
  },
  {
    id: 2,
    icon: Baby,
    mythEn: "Pregnant women should eat less.",
    mythHi: "गर्भवती महिलाओं को कम खाना चाहिए।",
    factEn: "They should eat nutritious food for their health and baby's growth.",
    factHi: "उन्हें पौष्टिक भोजन करना चाहिए ताकि माँ और बच्चे दोनों स्वस्थ रहें।",
  },
  {
    id: 3,
    icon: Droplet,
    mythEn: "Boiled water is bad for health.",
    mythHi: "उबला हुआ पानी नुकसानदायक होता है।",
    factEn: "Boiling kills germs and makes water safe to drink.",
    factHi: "उबालने से कीटाणु मर जाते हैं और पानी पीने योग्य बनता है।",
  },
  {
    id: 4,
    icon: ThermometerSun,
    mythEn: "Fever should not be treated with cold water.",
    mythHi: "बुखार में ठंडा पानी नहीं लगाना चाहिए।",
    factEn: "Cold compress helps reduce fever safely.",
    factHi: "ठंडा पानी बुखार को कम करने में मदद करता है।",
  },
  {
    id: 5,
    icon: Hospital,
    mythEn: "Only city hospitals provide good treatment.",
    mythHi: "सिर्फ शहर के अस्पताल ही अच्छा इलाज देते हैं।",
    factEn: "Government Primary Health Centres (PHCs) also give free, quality care.",
    factHi: "सरकारी प्राथमिक स्वास्थ्य केंद्र (PHC) भी मुफ्त और अच्छा इलाज देते हैं।",
  },
];

const MythCard = ({ misconception }: { misconception: Misconception }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const Icon = misconception.icon;

  return (
    <div 
      className="flip-card h-80 cursor-pointer perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`flip-card-inner relative h-full w-full transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        {/* Front - Myth */}
        <Card className="flip-card-face flip-card-front absolute inset-0 flex flex-col items-center justify-center p-6 backface-hidden border-2 border-destructive bg-gradient-to-br from-destructive/10 to-background shadow-lg">
          <div className="mb-4 rounded-full bg-destructive/20 p-4">
            <Icon className="h-12 w-12 text-destructive" />
          </div>
          <div className="mb-3 flex items-center gap-2">
            <XCircle className="h-6 w-6 text-destructive" />
            <h3 className="text-xl font-bold text-destructive">Myth / गलत धारणा</h3>
          </div>
          <p className="mb-2 text-center text-lg font-semibold text-foreground">
            {misconception.mythEn}
          </p>
          <p className="text-center text-base text-muted-foreground">
            {misconception.mythHi}
          </p>
          <p className="mt-4 text-sm text-muted-foreground italic">
            (Tap to see the truth)
          </p>
        </Card>

        {/* Back - Fact */}
        <Card className="flip-card-face flip-card-back absolute inset-0 flex flex-col items-center justify-center p-6 backface-hidden rotate-y-180 border-2 border-secondary bg-gradient-to-br from-secondary/10 to-background shadow-lg">
          <div className="mb-4 rounded-full bg-secondary/20 p-4">
            <Icon className="h-12 w-12 text-secondary" />
          </div>
          <div className="mb-3 flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-secondary" />
            <h3 className="text-xl font-bold text-secondary">Fact / सच्चाई</h3>
          </div>
          <p className="mb-2 text-center text-lg font-semibold text-foreground">
            {misconception.factEn}
          </p>
          <p className="text-center text-base text-muted-foreground">
            {misconception.factHi}
          </p>
          <p className="mt-4 text-sm text-muted-foreground italic">
            (Tap to go back)
          </p>
        </Card>
      </div>
    </div>
  );
};

const Misconceptions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-accent/5 to-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading mb-4 text-4xl font-bold text-foreground md:text-5xl">
            Common Health Misconceptions
          </h1>
          <h2 className="font-heading mb-6 text-3xl font-semibold text-muted-foreground md:text-4xl">
            स्वास्थ्य से जुड़ी आम गलतफहमियाँ
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
            Learn the truth about common health myths in rural India. Tap each card to flip and discover the facts.
          </p>
          <p className="mx-auto mt-2 max-w-3xl text-base text-muted-foreground">
            ग्रामीण भारत में स्वास्थ्य से जुड़ी आम गलतफहमियों की सच्चाई जानें। हर कार्ड को टैप करें और सच्चाई खोजें।
          </p>
        </div>
      </section>

      {/* Did You Know Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <Card className="border-2 border-primary/30 bg-gradient-to-r from-primary/5 to-secondary/5 p-6 shadow-soft animate-fade-in">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-primary/20 p-3">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="font-heading mb-2 text-xl font-bold text-primary">
                  Did You Know? / क्या आप जानते हैं?
                </h3>
                <p className="text-foreground">
                  <strong>Most health problems in rural areas can be prevented with simple knowledge and basic healthcare practices.</strong>
                </p>
                <p className="mt-1 text-muted-foreground">
                  ग्रामीण क्षेत्रों में अधिकांश स्वास्थ्य समस्याओं को सरल जानकारी और बुनियादी स्वास्थ्य प्रथाओं से रोका जा सकता है।
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Misconceptions Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {misconceptions.map((misconception, index) => (
              <div 
                key={misconception.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <MythCard misconception={misconception} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <Card className="mx-auto max-w-3xl border-2 border-secondary/30 bg-gradient-to-br from-secondary/10 to-background p-8 shadow-lg">
            <CheckCircle className="mx-auto mb-4 h-16 w-16 text-secondary" />
            <h3 className="font-heading mb-4 text-2xl font-bold text-foreground">
              Stay Informed, Stay Healthy
            </h3>
            <h4 className="font-heading mb-4 text-xl font-semibold text-muted-foreground">
              जानकार बनें, स्वस्थ रहें
            </h4>
            <p className="mb-2 text-lg text-foreground">
              Share these facts with your family and friends. Knowledge saves lives.
            </p>
            <p className="text-base text-muted-foreground">
              इन तथ्यों को अपने परिवार और दोस्तों के साथ साझा करें। ज्ञान जीवन बचाता है।
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Misconceptions;
