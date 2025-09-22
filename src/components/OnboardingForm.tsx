import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { GraduationCap, MapPin, Briefcase, Star, ArrowRight } from 'lucide-react';

interface OnboardingFormProps {
  onComplete: (data: UserProfile) => void;
}

export interface UserProfile {
  name: string;
  education: string;
  fieldOfStudy: string;
  skills: string[];
  interests: string[];
  location: string;
  preferredSectors: string[];
  experience: string;
}

const skillOptions = [
  'Communication', 'Teamwork', 'Problem Solving', 'Leadership', 'Digital Literacy',
  'Data Analysis', 'Customer Service', 'Marketing', 'Content Writing', 'Programming',
  'Design', 'Research', 'Financial Analysis', 'Project Management'
];

const interestOptions = [
  'Technology', 'Healthcare', 'Education', 'Finance', 'Marketing', 'Government',
  'Non-Profit', 'Environment', 'Agriculture', 'Manufacturing', 'Tourism', 'Media'
];

const sectorOptions = [
  'Information Technology', 'Healthcare & Medicine', 'Education & Training',
  'Banking & Finance', 'Government & Public Service', 'Manufacturing',
  'Agriculture & Rural Development', 'Tourism & Hospitality', 'Media & Communications',
  'Environmental Services', 'Social Work & NGO', 'Retail & E-commerce'
];

export function OnboardingForm({ onComplete }: OnboardingFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    skills: [],
    interests: [],
    preferredSectors: []
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(formData as UserProfile);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (field: keyof UserProfile, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: 'skills' | 'interests' | 'preferredSectors', item: string) => {
    const currentArray = formData[field] || [];
    const newArray = currentArray.includes(item)
      ? currentArray.filter(i => i !== item)
      : [...currentArray, item];
    updateFormData(field, newArray);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-background to-accent-light p-4 flex items-center justify-center">
      <Card className="w-full max-w-2xl shadow-card">
        <CardHeader className="text-center space-y-4">
          <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
            <GraduationCap className="w-6 h-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            PM Internship Recommendation
          </CardTitle>
          <CardDescription className="text-base">
            हम आपके लिए सबसे उपयुक्त इंटर्नशिप खोजने में मदद करेंगे
          </CardDescription>
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-muted-foreground">
            Step {currentStep} of {totalSteps}
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold mb-2">Basic Information</h3>
                <p className="text-muted-foreground">बुनियादी जानकारी साझा करें</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="name">Full Name / पूरा नाम</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={formData.name || ''}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="education">Education Level / शिक्षा स्तर</Label>
                <Select value={formData.education} onValueChange={(value) => updateFormData('education', value)}>
                  <SelectTrigger className="text-lg">
                    <SelectValue placeholder="Select your education level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10th">10th Grade / दसवीं कक्षा</SelectItem>
                    <SelectItem value="12th">12th Grade / बारहवीं कक्षा</SelectItem>
                    <SelectItem value="diploma">Diploma / डिप्लोमा</SelectItem>
                    <SelectItem value="undergraduate">Bachelor's Degree / स्नातक</SelectItem>
                    <SelectItem value="postgraduate">Master's Degree / परास्नातक</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="field">Field of Study / अध्ययन क्षेत्र</Label>
                <Input
                  id="field"
                  placeholder="e.g., Computer Science, Commerce, Arts"
                  value={formData.fieldOfStudy || ''}
                  onChange={(e) => updateFormData('fieldOfStudy', e.target.value)}
                  className="text-lg"
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold mb-2">Your Skills</h3>
                <p className="text-muted-foreground">अपने कौशल चुनें (Select multiple)</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {skillOptions.map((skill) => (
                  <div key={skill} className="flex items-center space-x-2">
                    <Checkbox
                      id={skill}
                      checked={formData.skills?.includes(skill)}
                      onCheckedChange={() => toggleArrayItem('skills', skill)}
                    />
                    <label htmlFor={skill} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {skill}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold mb-2">Interests & Preferences</h3>
                <p className="text-muted-foreground">रुचियां और प्राथमिकताएं</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium mb-3 block">Areas of Interest / रुचि के क्षेत्र</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {interestOptions.map((interest) => (
                      <div key={interest} className="flex items-center space-x-2">
                        <Checkbox
                          id={interest}
                          checked={formData.interests?.includes(interest)}
                          onCheckedChange={() => toggleArrayItem('interests', interest)}
                        />
                        <label htmlFor={interest} className="text-sm font-medium leading-none">
                          {interest}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Preferred Location / पसंदीदा स्थान</Label>
                  <Input
                    id="location"
                    placeholder="Enter city or state"
                    value={formData.location || ''}
                    onChange={(e) => updateFormData('location', e.target.value)}
                    className="text-lg"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold mb-2">Final Preferences</h3>
                <p className="text-muted-foreground">अंतिम प्राथमिकताएं</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium mb-3 block">Preferred Sectors / पसंदीदा क्षेत्र</Label>
                  <div className="grid grid-cols-1 gap-3">
                    {sectorOptions.map((sector) => (
                      <div key={sector} className="flex items-center space-x-2">
                        <Checkbox
                          id={sector}
                          checked={formData.preferredSectors?.includes(sector)}
                          onCheckedChange={() => toggleArrayItem('preferredSectors', sector)}
                        />
                        <label htmlFor={sector} className="text-sm font-medium leading-none">
                          {sector}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Previous Experience / पूर्व अनुभव</Label>
                  <Select value={formData.experience} onValueChange={(value) => updateFormData('experience', value)}>
                    <SelectTrigger className="text-lg">
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Experience / कोई अनुभव नहीं</SelectItem>
                      <SelectItem value="some">Some Projects / कुछ परियोजनाएं</SelectItem>
                      <SelectItem value="internship">Previous Internship / पूर्व इंटर्नशिप</SelectItem>
                      <SelectItem value="work">Work Experience / कार्य अनुभव</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="flex items-center space-x-2"
            >
              <span>Previous</span>
            </Button>
            
            <Button
              onClick={handleNext}
              className="flex items-center space-x-2 bg-gradient-primary hover:opacity-90"
            >
              <span>{currentStep === totalSteps ? 'Get Recommendations' : 'Next'}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}