import { useForm } from 'react-hook-form';
import { User, Mail, Phone, MapPin, Globe } from 'lucide-react';
import usePortfolioStore from '../../store/portfolioStore';
import Input from '../ui/Input';

const PersonalInfoForm = () => {
  const { portfolioData, updatePersonalInfo } = usePortfolioStore();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: portfolioData.personalInfo
  });

  const onSubmit = (data) => {
    updatePersonalInfo(data);
  };

  return (
    <form onBlur={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Personal Information
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Tell us about yourself. This information will appear on your portfolio.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          icon={<User className="w-5 h-5" />}
          placeholder="John Doe"
          error={errors.name?.message}
          {...register('name', { required: 'Name is required' })}
        />

        <Input
          label="Professional Title"
          icon={<User className="w-5 h-5" />}
          placeholder="Full Stack Developer"
          error={errors.title?.message}
          {...register('title', { required: 'Title is required' })}
        />

        <Input
          label="Email"
          type="email"
          icon={<Mail className="w-5 h-5" />}
          placeholder="john@example.com"
          error={errors.email?.message}
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
        />

        <Input
          label="Phone"
          icon={<Phone className="w-5 h-5" />}
          placeholder="+1 234 567 8900"
          {...register('phone')}
        />

        <Input
          label="Location"
          icon={<MapPin className="w-5 h-5" />}
          placeholder="San Francisco, CA"
          {...register('location')}
        />

        <Input
          label="Website"
          icon={<Globe className="w-5 h-5" />}
          placeholder="https://yourwebsite.com"
          {...register('website')}
        />
      </div>
    </form>
  );
};

export default PersonalInfoForm;
