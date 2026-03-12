from PIL import Image
import os

def split_collage(input_image_path):
    try:
        # Open the original image
        img = Image.open(input_image_path)
        width, height = img.size

        # Calculate midpoints
        mid_w = width // 2
        mid_h = height // 2

        # Define the crop boxes (left, upper, right, lower)
        boxes = {
            "wedding.png": (0, 0, mid_w, mid_h),
            "social.png": (mid_w, 0, width, mid_h),
            "graduation.png": (0, mid_h, mid_w, height),
            "karaoke.png": (mid_w, mid_h, width, height)
        }

        # Crop and save each section
        for filename, box in boxes.items():
            cropped_img = img.crop(box)
            cropped_img.save(filename)
            print(f"Successfully saved {filename}")

    except FileNotFoundError:
        print(f"Error: Could not find '{input_image_path}'. Please ensure it is in the same directory as this script.")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    split_collage("service_collage.png")
