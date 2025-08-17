import { Html, Head, Body, Text, Section } from '@react-email/components';

interface ContactFormEmailProps {
  name: string;
  email: string;
  message: string;
}

export const ContactFormEmail = ({
  name,
  email,
  message
}: ContactFormEmailProps) => (
  <Html>
    <Head />
    <Body>
      <Section>
        <Text>
          From <strong>{name}</strong> at {email}
        </Text>
        <Text>{message}</Text>
      </Section>
    </Body>
  </Html>
);