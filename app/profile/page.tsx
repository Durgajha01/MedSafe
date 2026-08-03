'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/lib/auth-context';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    dateOfBirth: user?.dateOfBirth || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateUser(formData);
    setIsEditing(false);
  };

  return (
    <>
      <Navbar title="Profile" />
      <div className="flex-1 overflow-auto">
        <div className="p-8 max-w-2xl mx-auto space-y-6">
          {/* Profile Header */}
          <Card className="p-8 text-center space-y-6">
            <Avatar className="w-24 h-24 mx-auto">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback className="text-2xl">
                {user?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div>
              <h1 className="text-3xl font-bold text-foreground">{user?.name}</h1>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>

            <Button onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </Card>

          {/* Profile Information */}
          <Card className="p-6 space-y-6">
            <h2 className="text-xl font-bold text-foreground">Personal Information</h2>

            {isEditing ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                  />
                </div>

                <Button onClick={handleSave} className="w-full">
                  Save Changes
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                  <p className="text-foreground mt-1">{user?.name || 'Not provided'}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="text-foreground mt-1">{user?.email || 'Not provided'}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">Phone Number</p>
                  <p className="text-foreground mt-1">{user?.phone || 'Not provided'}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">Date of Birth</p>
                  <p className="text-foreground mt-1">
                    {user?.dateOfBirth
                      ? new Date(user.dateOfBirth).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })
                      : 'Not provided'}
                  </p>
                </div>
              </div>
            )}
          </Card>

          {/* Account Settings */}
          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-bold text-foreground">Account Settings</h2>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/20">
                <div>
                  <p className="font-medium text-foreground">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Get updates about your medications</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/20">
                <div>
                  <p className="font-medium text-foreground">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">Medication reminders and alerts</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/20">
                <div>
                  <p className="font-medium text-foreground">Data Sharing</p>
                  <p className="text-sm text-muted-foreground">Help improve our AI with your data</p>
                </div>
                <input type="checkbox" className="w-5 h-5" />
              </div>
            </div>
          </Card>

          {/* Preferences */}
          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-bold text-foreground">Preferences</h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Theme</label>
                <div className="flex gap-3">
                  <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium">
                    Light
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-secondary text-foreground font-medium hover:bg-secondary/80">
                    Dark
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-secondary text-foreground font-medium hover:bg-secondary/80">
                    Auto
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Language</label>
                <select className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Help & Support */}
          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-bold text-foreground">Help & Support</h2>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                📚 Help Center
              </Button>
              <Button variant="outline" className="w-full justify-start">
                📧 Contact Support
              </Button>
              <Button variant="outline" className="w-full justify-start">
                📋 Privacy Policy
              </Button>
              <Button variant="outline" className="w-full justify-start">
                ⚖️ Terms of Service
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
