const menuItems = [
  {
    id: 1,
    name: 'Bruschetta',
    category: 'Starters',
    description: 'Grilled bread with tomatoes, olive oil, and herbs.',
    price: '₹150',
    image: "img1.jpeg",
  },
  {
    id: 2,
    name: 'Garlic Bread',
    category: 'Starters',
    description: 'Freshly baked bread with garlic butter and herbs.',
    price: '₹120',
    image: 'img2.jpeg',
  },
  { 
    id: 3,
    name: 'Grilled Chicken',
    category: 'Main Course',
    description: 'Tender grilled chicken with spices, served with rice.',
    price: '₹350',
    image: 'image3.jpeg',
  },
  {
    id: 4,
    name: 'Veg Biryani',
    category: 'Main Course',
    description: 'Aromatic basmati rice with mixed vegetables and spices.',
    price: '₹250',
    image: 'img4.jpeg',
  },
  {
    id: 5,
    name: 'Chocolate Brownie',
    category: 'Desserts',
    description: 'Rich chocolate brownie served with ice cream.',
    price: '₹180',
    image: 'img5.jpeg',
  },
  {
    id: 6,
    name: 'Gulab Jamun',
    category: 'Desserts',
    description: 'Traditional Indian sweet served warm.',
    price: '₹130',
    image: 'img6.jpeg',
  },
  {
    id: 7,
    name: 'Coke',
    category: 'Drinks',
    description: 'Refreshing Coca-Cola.',
    price: '₹50',
    image: 'img7.jpeg',
  },
  {
    id: 8,
    name: 'Lemonade',
    category: 'Drinks',
    description: 'Fresh lemon drink.',
    price: '₹60',
    image: 'img8.jpeg',
  },
  {
    id: 9,
    name: 'Paneer Tikka',
    category: 'Specials',
    description: 'Spiced paneer cubes grilled to perfection.',
    price: '₹300',
    image: 'img9.jpeg',
  },
  {
    id: 10,
    name: 'Mutton Curry',
    category: 'Specials',
    description: 'Rich spicy mutton curry.',
    price: '₹400',
    image: 'img10.jpeg',
  },
  {
    id: 11,
    name: 'Butter Naan',
    category: 'Starters',
    description: 'Soft Indian flatbread served with butter.',
    price: '₹50',
    image: 'img11.jpeg',
  },
  {
    id: 12,
    name: 'Masala Dosa',
    category: 'Main Course',
    description: 'Crispy rice crepe stuffed with spiced potatoes.',
    price: '₹200',
    image: 'img12.jpeg',
  },
  {
    id: 13,
    name: 'Roti',
    category: 'Main Course',
    description: 'Whole wheat Indian flatbread, served hot.',
    price: '₹20',
    image: 'img13.jpeg',
  },
  {
    id: 14,
    name: 'Chicken Tikka Masala',
    category: 'Specials',
    description: 'Grilled chicken in creamy spiced tomato sauce.',
    price: '₹380',
    image: 'img14.jpeg',
  },
  {
    id: 15,
    name: 'Paneer Butter Masala',
    category: 'Specials',
    description: 'Soft paneer cubes cooked in rich tomato butter gravy.',
    price: '₹320',
    image: 'img15.jpeg',
  },
  {
    id: 16,
    name: 'Lassi',
    category: 'Drinks',
    description: 'Sweet yogurt-based traditional Indian drink.',
    price: '₹80',
    image: 'img16.jpeg',
  },
  {
    id: 17,
    name: 'Prawn Curry',
    category: 'Specials',
    description: 'Spicy prawn curry made with traditional spices.',
    price: '₹450',
    image: 'img17.jpeg',
  },
  {
    id: 18,
    name: 'Aloo Paratha',
    category: 'Starters',
    description: 'Indian flatbread stuffed with spiced potato filling.',
    price: '₹100',
    image: 'img18.jpeg',
  },
  {
    id: 19,
    name: 'Mango Lassi',
    category: 'Drinks',
    description: 'Refreshing mango-flavored yogurt drink.',
    price: '₹100',
    image: 'img19.jpeg',
  },
  {
    id: 20,
    name: 'Vegetable Curry',
    category: 'Main Course',
    description: 'Mixed vegetable curry with rich gravy.',
    price: '₹250',
    image: 'img20.jpeg',
  },
 
  {
    id: 21,
    name: 'Rasmalai',
    category: 'Desserts',
    description: 'Soft cheese patties soaked in sweetened milk and flavored with cardamom.',
    price: '₹150',
    image: 'img21.jpeg',
  },
  {
    id: 22,
    name: 'Kheer',
    category: 'Desserts',
    description: 'Creamy rice pudding with cardamom, nuts, and saffron.',
    price: '₹120',
    image: 'img22.jpeg',
  },
  {
    id: 23,
    name: 'Jalebi',
    category: 'Desserts',
    description: 'Deep-fried spirals soaked in sugar syrup, crispy and sweet.',
    price: '₹100',
    image: 'img23.jpeg',
  },
  {
    id: 24,
    name: 'Peda',
    category: 'Desserts',
    description: 'Milk-based soft sweet flavored with cardamom.',
    price: '₹80',
    image: 'img24.jpeg',
  },
  {
    id: 25,
    name: 'Gajar Halwa',
    category: 'Desserts',
    description: 'Carrot pudding cooked with milk, sugar, and ghee.',
    price: '₹170',
    image: 'img25.jpeg',
  },

  {
    id: 26,
    name: 'Chicken Pakora',
    category: 'Starters',
    description: 'Spiced chicken pieces deep-fried in a gram flour batter.',
    price: '₹200',
    image: 'img26.jpeg',
  },
  {
    id: 27,
    name: 'Paneer Pakora',
    category: 'Starters',
    description: 'Soft paneer cubes coated in seasoned batter and fried.',
    price: '₹180',
    image: 'img27.jpeg',
  },
  {
    id: 28,
    name: 'Vegetable Spring Rolls',
    category: 'Starters',
    description: 'Crispy rolls filled with mixed vegetables and served with sauce.',
    price: '₹150',
    image: 'img28.jpeg',
  },
  {
    id: 29,
    name: 'Samosa',
    category: 'Starters',
    description: 'Fried pastry filled with spicy potatoes and peas.',
    price: '₹80',
    image: 'img29.jpeg',
  },
  {
    id: 30,
    name: 'Prawn Fry',
    category: 'Starters',
    description: 'Crispy fried prawns with aromatic spices.',
    price: '₹300',
    image: 'img30.jpeg',
  },
  {
    id: 31,
    name: 'Dal Makhani',
    category: 'Main Course',
    description: 'Creamy black lentils cooked slowly with butter and spices.',
    price: '₹280',
    image: 'img31.jpeg',
  },
  {
    id: 32,
    name: 'Chole Bhature',
    category: 'Main Course',
    description: 'Spicy chickpeas served with deep-fried fluffy bread.',
    price: '₹220',
    image: 'img32.jpeg',
  },
  {
    id: 33,
    name: 'Fish Curry',
    category: 'Main Course',
    description: 'Spicy fish cooked in tangy curry with aromatic spices.',
    price: '₹400',
    image: 'img33.jpeg',
  },
  {
    id: 34,
    name: 'Mutton Biryani',
    category: 'Main Course',
    description: 'Fragr',
    image: 'img34.jpeg',

  } ,
  {
    id: 35,
    name: 'Kulfi',
    category: 'Desserts',
    description: 'Traditional Indian ice cream flavored with cardamom and pistachios.',
    price: '₹150',
    image: 'img35.jpeg',
  },
  {
    id: 36,
    name: 'Carrot Halwa',
    category: 'Desserts',
    description: 'Sweet carrot pudding cooked with milk, sugar, and ghee.',
    price: '₹160',
    image: 'img36.jpeg',
  },
  {
    id: 37,
    name: 'Masala Chai',
    category: 'Drinks',
    description: 'Spiced Indian tea made with milk, cardamom, and ginger.',
    price: '₹40',
    image: 'img37.jpeg',
  },
  {
    id: 38,
    name: 'Cold Coffee',
    category: 'Drinks',
    description: 'Chilled coffee with milk, sugar, and ice cubes.',
    price: '₹100',
    image: 'img38.jpeg',
  },
  {
    id: 39,
    name: 'Thandai',
    category: 'Drinks',
    description: 'A refreshing drink made with milk, nuts, and spices.',
    price: '₹120',
    image: 'img39.jpeg',
  },
  {
    id: 40,
    name: 'Coconut Water',
    category: 'Drinks',
    description: 'Fresh coconut water served chilled.',
    price: '₹80',
    image: 'img40.jpeg',
  },
  {
    id: 41,
    name: 'Badam Milk',
    category: 'Drinks',
    description: 'Warm milk flavored with almonds and cardamom.',
    price: '₹130',
    image: 'img41.jpeg',
  },




];
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

// (menuItems array remains EXACTLY as you sent)

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const addToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exist = cart.find((i) => i.id === item.id);

    if (exist) {
      exist.qty += 1;
    } else {
      cart.push({ ...item, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Item added to cart 🛒");
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    alert("Logged out successfully");
    navigate("/login");
  };

  const filteredItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  const categories = ["All", "Starters", "Main Course", "Desserts", "Drinks", "Specials"];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-amber-50 to-white">

      {/* Header with back button and cart link */}
      <div className="flex items-center justify-between p-4 bg-white shadow">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-amber-900 hover:text-amber-600 transition"
        >
          ← Back
        </button>
        <Link to="/cart" className="text-amber-900 hover:text-amber-600 transition">
          <ShoppingCart size={24} />
        </Link>
      </div>

      <div className="p-6">
        {/* CATEGORY BUTTONS */}
        <div className="flex flex-wrap gap-3 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full font-semibold transition ${
                selectedCategory === cat
                  ? "bg-amber-600 text-white"
                  : "bg-amber-100 text-amber-900 hover:bg-amber-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* MENU ITEMS */}
        <div className="grid md:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white shadow p-4 rounded">
              <img src={item.image} className="h-40 w-full object-cover" alt={item.name} />
              <h2 className="font-semibold">{item.name}</h2>
              <p className="text-gray-500 text-sm">{item.description}</p>
              <p className="font-bold">{item.price}</p>
              <button
                onClick={() => addToCart(item)}
                className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1 mt-2 rounded font-semibold transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

